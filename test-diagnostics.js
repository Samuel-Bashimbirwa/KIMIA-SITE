#!/usr/bin/env node
/**
 * Script de diagnostic Kimia RDC
 * Usage: node test-diagnostics.js [target-email]
 * 
 * Ce script teste :
 * 1. La disponibilité du serveur Kimia (/api/health)
 * 2. L'état de la configuration SMTP / E-mail (/api/diagnostics)
 * 3. L'envoi d'une question test (/api/questions)
 * 4. L'envoi d'un e-mail de test immédiat (/api/diagnostics/send-test)
 * 5. La consultation du journal d'envoi (Outbox logs)
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const TARGET_EMAIL = process.argv[2] || "samuelbashimbirwa@gmail.com";

console.log("=================================================");
console.log(" TEST & DIAGNOSTIC AUTOMATISÉ — PLATEFORME KIMIA");
console.log(`URL Cible : ${BASE_URL}`);
console.log(`E-mail Test : ${TARGET_EMAIL}`);
console.log("=================================================\n");

async function runTests() {
  let passed = 0;
  let failed = 0;

  // Test 1: Healthcheck
  try {
    console.log("▶ [Test 1/5] Vérification de l'état du serveur (/api/health)...");
    const res = await fetch(`${BASE_URL}/api/health`);
    const data = await res.json();
    if (res.ok && data.status === "ok") {
      console.log("   Serveur en ligne et opérationnel.");
      console.log(`     - Plateforme : ${data.platform}`);
      console.log(`     - Admin : ${data.adminEmail}`);
      console.log(`     - SMTP configuré : ${data.smtpConfigured ? "OUI" : "NON (mode journal actif)"}`);
      passed++;
    } else {
      throw new Error(`Réponse inattendue : ${JSON.stringify(data)}`);
    }
  } catch (err) {
    console.error("   Échec Test 1 :", err.message);
    failed++;
  }

  // Test 2: Diagnostics SMTP
  try {
    console.log("\n▶ [Test 2/5] Diagnostic SMTP et variables d'environnement (/api/diagnostics)...");
    const res = await fetch(`${BASE_URL}/api/diagnostics`);
    const data = await res.json();
    if (res.ok) {
      console.log("   Diagnostic récupéré :");
      console.log(`     - Statut SMTP : ${data.smtp?.connected ? "Connecté avec succès" : "Non connecté"}`);
      console.log(`     - Message : ${data.smtp?.message}`);
      if (data.smtp?.configured) {
        console.log(`     - Serveur SMTP configuré : ${data.smtp.host}:${data.smtp.port}`);
      } else {
        console.log(`     - ℹ Information : Pour recevoir les mails dans votre boîte Gmail personnelle, configurez SMTP_HOST, SMTP_USER, SMTP_PASS.`);
      }
      console.log(`     - Nombre total d'e-mails tracés dans le journal : ${data.outbox?.totalSent || 0}`);
      passed++;
    } else {
      throw new Error(`Erreur HTTP ${res.status}`);
    }
  } catch (err) {
    console.error("   Échec Test 2 :", err.message);
    failed++;
  }

  // Test 3: Soumission d'une question
  try {
    console.log("\n▶ [Test 3/5] Test de soumission de formulaire de contact (/api/questions)...");
    const testPayload = {
      name: "Testeur Automatisé Kimia",
      email: TARGET_EMAIL,
      phone: "+243 81 000 0000",
      province: "Kinshasa",
      subject: "Test Diagnostic Automatisé",
      message: "Ceci est un message généré par le script de test pour vérifier la transmission des dossiers et notifications.",
    };

    const res = await fetch(`${BASE_URL}/api/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testPayload),
    });
    const data = await res.json();

    if (res.ok && data.success) {
      console.log("   Question créée et traitée avec succès !");
      console.log(`     - Référence Dossier : ${data.referenceCode}`);
      console.log(`     - Statut livraison : ${data.deliveryInfo?.deliveredToSmtp ? "Livré à SMTP" : "Enregistré dans le journal"}`);
      passed++;
    } else {
      throw new Error(data.error || "Échec de création");
    }
  } catch (err) {
    console.error("   Échec Test 3 :", err.message);
    failed++;
  }

  // Test 4: Envoi de test explicite
  try {
    console.log(`\n▶ [Test 4/5] Envoi d'un e-mail de test immédiat vers ${TARGET_EMAIL}...`);
    const res = await fetch(`${BASE_URL}/api/diagnostics/send-test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: TARGET_EMAIL }),
    });
    const data = await res.json();

    if (res.ok) {
      if (data.result?.deliveredToSmtp) {
        console.log("   Test d'envoi exécuté et délivré au serveur SMTP avec succès !");
        console.log(`     - Message ID : ${data.result.messageId}`);
      } else {
        console.log("  ℹ Test d'envoi traité (consultez le statut SMTP) :");
        console.log(`     - Résultat : ${data.message}`);
        if (data.result?.error) {
          console.log(`     - Diagnostic : ${data.result.error}`);
        }
      }
      passed++;
    } else {
      throw new Error(data.error || "Échec du test d'envoi");
    }
  } catch (err) {
    console.error("   Échec Test 4 :", err.message);
    failed++;
  }

  // Test 5: Vérification de l'Outbox Journal
  try {
    console.log("\n▶ [Test 5/5] Consultation des derniers e-mails enregistrés dans le journal...");
    const res = await fetch(`${BASE_URL}/api/diagnostics`);
    const data = await res.json();
    const logs = data.outbox?.logs || [];

    if (logs.length > 0) {
      console.log(`   ${logs.length} e-mails présents dans le journal d'envoi :`);
      logs.slice(0, 3).forEach((log, index) => {
        console.log(`     [#${index + 1}] Vers: ${log.recipient} | Objet: ${log.subject} | Date: ${log.timestamp}`);
      });
      passed++;
    } else {
      console.log("   Aucun e-mail dans le journal.");
    }
  } catch (err) {
    console.error("   Échec Test 5 :", err.message);
    failed++;
  }

  console.log("\n=================================================");
  console.log(`RÉSULTAT FINAL : ${passed} réussi(s), ${failed} échec(s)`);
  if (failed === 0) {
    console.log(" TOUS LES TESTS SONT AU VERT !");
  } else {
    console.log(" Des alertes nécessitent votre attention.");
  }
  console.log("=================================================\n");
}

runTests();
