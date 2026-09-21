import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import {
  sendEmail,
  verifySmtpConnection,
  emailOutboxLogs,
  getEffectiveSmtpConfig,
} from "./src/services/mailer";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  province?: string;
  createdAt: string;
  status: "pending" | "transmitted_to_lawyer" | "answered";
  targetRecipient: string;
  mailDelivery?: any;
}

const inquiries: Inquiry[] = [
  {
    id: "KIM-8421",
    name: "Mireille Kasongo",
    email: "mireille.k@example.cd",
    subject: "Orientation juridique",
    message: "Bonjour, je sollicite une assistance juridique concernant des violences conjugales récurrentes à Kinshasa.",
    province: "Kinshasa",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: "transmitted_to_lawyer",
    targetRecipient: "samuelbashimbirwa@gmail.com",
  },
  {
    id: "KIM-8422",
    name: "Chantal Mwamba",
    email: "chantal.mwamba@example.cd",
    subject: "Procurez-vous le livre",
    message: "Est-il possible d'obtenir 15 exemplaires du guide pour notre association de jeunes filles à Goma ?",
    province: "Nord-Kivu",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: "pending",
    targetRecipient: "samuelbashimbirwa@gmail.com",
  },
];

async function startServer() {
  const app = express();
  const PORT = 3000;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "samuelbashimbirwa@gmail.com";

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Health Check
  app.get("/api/health", (_req, res) => {
    const config = getEffectiveSmtpConfig();
    res.json({
      status: "ok",
      platform: "Kimia RDC Web Platform",
      adminEmail: ADMIN_EMAIL,
      smtpConfigured: config.isConfigured,
      smtpHost: config.host ? `${config.host}:${config.port}` : "Non configuré (mode journal actif)",
      outboxCount: emailOutboxLogs.length,
      timestamp: new Date().toISOString(),
    });
  });

  // Diagnostic / Diagnostics API
  app.get("/api/diagnostics", async (_req, res) => {
    const config = getEffectiveSmtpConfig();
    const smtpStatus = await verifySmtpConnection();
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      adminEmail: ADMIN_EMAIL,
      smtp: {
        ...smtpStatus,
        host: config.host,
        port: config.port,
        user: config.user,
        secure: config.secure,
      },
      outbox: {
        totalSent: emailOutboxLogs.length,
        logs: emailOutboxLogs,
      },
      inquiriesCount: inquiries.length,
    });
  });

  // Send a test diagnostic email directly to adminEmail
  app.post("/api/diagnostics/send-test", async (req, res) => {
    const targetEmail = req.body.email || ADMIN_EMAIL;
    const testResult = await sendEmail({
      to: targetEmail,
      subject: `[Diagnostic MALK'ia RDC] Test de livraison d'e-mail (${new Date().toLocaleTimeString("fr-FR")})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #E6DDCC; border-radius: 12px; background: #FAF8F5;">
          <h2 style="color: #B8882C; margin-top: 0;">MALK'ia RDC — Test de diagnostic e-mail</h2>
          <p>Bonjour Samuel,</p>
          <p>Ce message confirme l'exécution du test de diagnostic du système de notification de la plateforme MALK'ia.</p>
          <div style="background: #FFF; padding: 15px; border-radius: 8px; border: 1px solid #E2D9C8; font-size: 14px;">
            <p><strong>Destinataire testé :</strong> ${targetEmail}</p>
            <p><strong>Date & Heure :</strong> ${new Date().toISOString()}</p>
            <p><strong>Mode :</strong> ${process.env.SMTP_HOST ? "SMTP Réseau (" + process.env.SMTP_HOST + ")" : "Simulation Outbox"}</p>
          </div>
          <p style="font-size: 12px; color: #736B5E; margin-top: 20px;">
            Plateforme MALK'ia — « Connaître ses droits, c'est mieux ».
          </p>
        </div>
      `,
      text: `Diagnostic MALK'ia RDC : Test de notification envoyé à ${targetEmail} le ${new Date().toISOString()}`,
    });

    res.json({
      success: testResult.deliveredToSmtp,
      message: testResult.deliveredToSmtp
        ? `E-mail de test expédié avec succès vers ${targetEmail} via SMTP !`
        : testResult.error
        ? `Échec d'expédition SMTP : ${testResult.error}. L'e-mail a été consigné dans le journal de diagnostic ci-dessous.`
        : `Test exécuté. Les variables SMTP ne sont pas encore configurées dans les secrets : l'e-mail a été enregistré dans le journal d'envoi consultable ci-dessous.`,
      result: testResult,
    });
  });

  // Contact / Questions submission endpoint
  app.post("/api/questions", async (req, res) => {
    try {
      const { name, email, subject, message, phone, province } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          error: "Veuillez renseigner votre nom, adresse e-mail et votre message.",
        });
      }

      const newId = `KIM-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Dispatch real email to Admin
      const adminMailResult = await sendEmail({
        to: ADMIN_EMAIL,
        replyTo: String(email).trim(),
        subject: `[MALK'ia RDC - Nouvelle Question ${newId}] ${subject || "Orientation juridique"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #E6DDCC; border-radius: 12px; background: #FAF8F5;">
            <h2 style="color: #1E1C1A; border-bottom: 2px solid #D4A346; padding-bottom: 8px;">
              Nouvelle demande reçue sur MALK'ia RDC
            </h2>
            <p><strong>Numéro de dossier :</strong> ${newId}</p>
            <p><strong>Nom de l'expéditeur :</strong> ${name}</p>
            <p><strong>E-mail :</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Téléphone / WhatsApp :</strong> ${phone || "Non renseigné"}</p>
            <p><strong>Province :</strong> ${province || "Non spécifié"}</p>
            <p><strong>Sujet :</strong> ${subject || "Orientation générale"}</p>
            <div style="margin-top: 15px; padding: 15px; background: #FFFFFF; border-radius: 8px; border: 1px solid #DDD5C5;">
              <h4 style="margin-top: 0; color: #544D42;">Message :</h4>
              <p style="white-space: pre-wrap; color: #22201D; line-height: 1.6;">${message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #7A7264;">
              Vous pouvez répondre directement à ce message pour contacter l'usagère.
            </p>
          </div>
        `,
        text: `Dossier ${newId} - ${name} (${email}): ${message}`,
      });

      // Dispatch real confirmation email to the user
      await sendEmail({
        to: String(email).trim(),
        subject: `[MALK'ia RDC] Confirmation de votre demande - Dossier ${newId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #E6DDCC; border-radius: 12px; background: #FAF8F5;">
            <h2 style="color: #B8882C;">MALK'ia — Droits des Femmes en RDC</h2>
            <p>Bonjour ${name},</p>
            <p>Nous avons bien reçu votre question. Notre équipe juridique et nos bénévoles l'examinent en toute confidentialité.</p>
            <p><strong>Votre numéro de référence :</strong> ${newId}</p>
            <div style="background: #FFFFFF; padding: 15px; border-radius: 8px; border: 1px solid #DDD5C5; margin: 15px 0;">
              <p style="margin: 0; font-size: 13px; color: #544D42;"><strong>Votre message :</strong></p>
              <p style="margin-top: 5px; font-size: 13px; color: #22201D;">${message}</p>
            </div>
            <p style="font-size: 13px; color: #544D42;">
              En cas d'urgence absolue, n'hésitez pas à composer le numéro vert gratuit <strong>122</strong> accessible 24h/24 en RDC.
            </p>
            <p style="font-size: 12px; color: #7A7264; margin-top: 20px;">
              L'équipe MALK'ia RDC — « Connaître ses droits, c'est mieux. »
            </p>
          </div>
        `,
      });

      const newInquiry: Inquiry = {
        id: newId,
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        subject: subject || "Question générale",
        message: String(message).trim(),
        phone: phone ? String(phone).trim() : undefined,
        province: province ? String(province).trim() : "Non spécifié",
        createdAt: new Date().toISOString(),
        status: "pending",
        targetRecipient: ADMIN_EMAIL,
        mailDelivery: adminMailResult,
      };

      inquiries.unshift(newInquiry);

      return res.status(201).json({
        success: true,
        message: adminMailResult.deliveredToSmtp
          ? "Votre question a été transmise et un e-mail a été expédié à l'administrateur."
          : "Votre question a été enregistrée avec succès. Note de diagnostic : configurez vos accès SMTP pour recevoir le mail directement sur Gmail.",
        referenceCode: newId,
        inquiry: newInquiry,
        deliveryInfo: adminMailResult,
      });
    } catch (err: any) {
      console.error("Error processing question:", err);
      return res.status(500).json({
        error: "Une erreur est survenue lors de l'enregistrement de votre demande.",
      });
    }
  });

  // Retrieve inquiries (admin/debug or state confirmation)
  app.get("/api/questions", (_req, res) => {
    res.json({
      success: true,
      total: inquiries.length,
      adminEmail: ADMIN_EMAIL,
      inquiries,
    });
  });

  // Book order / distribution request endpoint
  app.post("/api/book-order", async (req, res) => {
    const { name, email, phone, city, format, quantity = 1 } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "Nom et adresse email requis.",
      });
    }

    const orderId = `LIVRE-${Math.floor(10000 + Math.random() * 90000)}`;

    const mailResult = await sendEmail({
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `[Kimia Guide] Nouvelle commande de livre ${orderId} (${format})`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #FAF8F5;">
          <h2>Nouvelle commande du livre Kimia</h2>
          <p><strong>N° Commande :</strong> ${orderId}</p>
          <p><strong>Demandeur :</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
          <p><strong>Téléphone :</strong> ${phone || "Non renseigné"}</p>
          <p><strong>Ville :</strong> ${city || "Kinshasa"}</p>
          <p><strong>Format :</strong> ${format}</p>
          <p><strong>Quantité :</strong> ${quantity}</p>
        </div>
      `,
    });

    return res.status(201).json({
      success: true,
      orderId,
      message:
        "Votre demande d'acquisition du guide Kimia a été enregistrée avec succès.",
      targetEmail: ADMIN_EMAIL,
      deliveryInfo: mailResult,
    });
  });

  // Community registration endpoint
  app.post("/api/community-join", (req, res) => {
    const { name, email, phone, province, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Nom et e-mail requis." });
    }

    console.log(`[Kimia Community] New Member: ${name} (${email}) - ${role || "Sympathisante"}`);

    return res.status(201).json({
      success: true,
      message: "Bienvenue dans la communauté Kimia ! Vous recevrez le lien du groupe d'entraide.",
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kimia server listening on http://localhost:${PORT}`);
  });
}

startServer();
