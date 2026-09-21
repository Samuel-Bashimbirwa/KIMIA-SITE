import React, { useState, useEffect } from "react";
import {
  Activity,
  Mail,
  Server,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Send,
  Eye,
  Key,
  HelpCircle,
  Copy,
  Check,
} from "lucide-react";

interface DiagnosticsData {
  status: string;
  timestamp: string;
  adminEmail: string;
  smtp: {
    configured: boolean;
    connected: boolean;
    message: string;
    host?: string | null;
    port?: string | null;
    user?: string | null;
    secure?: string | null;
  };
  outbox: {
    totalSent: number;
    logs: Array<{
      id: string;
      deliveredToSmtp: boolean;
      mode: string;
      recipient: string;
      subject: string;
      timestamp: string;
      error?: string;
      previewSnippet: string;
      html: string;
    }>;
  };
  inquiriesCount: number;
}

export const DiagnosticsModalContent: React.FC<{ onClose: () => void }> = () => {
  const [data, setData] = useState<DiagnosticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [testingEmail, setTestingEmail] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedMail, setSelectedMail] = useState<any | null>(null);

  const fetchDiagnostics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/diagnostics");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnostics();
  }, []);

  const handleSendTestEmail = async () => {
    setTestingEmail(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/diagnostics/send-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "samuelbashimbirwa@gmail.com" }),
      });
      const resJson = await res.json();
      setTestResult(resJson.message);
      await fetchDiagnostics();
    } catch (err: any) {
      setTestResult(`Erreur lors du test : ${err.message}`);
    } finally {
      setTestingEmail(false);
    }
  };

  const copyEnvSample = () => {
    const text = `SMTP_HOST=smtp.gmail.com\nSMTP_PORT=465\nSMTP_SECURE=true\nSMTP_USER=samuelbashimbirwa@gmail.com\nSMTP_PASS=votremotdepasseapplication\nSMTP_FROM="Kimia RDC <samuelbashimbirwa@gmail.com>"`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#E6DDCC] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#FAF3E6] border border-[#E6DCC8] flex items-center justify-center text-[#B8882C]">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#1E1C1A]">
              Diagnostic & État des E-mails
            </h3>
            <p className="text-xs text-[#736B5E]">
              Outil de vérification et de journalisation des messages Kimia
            </p>
          </div>
        </div>

        <button
          onClick={fetchDiagnostics}
          disabled={loading}
          className="p-2 rounded-xl border border-[#DDD5C5] bg-white text-[#544D42] hover:text-[#1E1C1A] hover:bg-[#F6EFE3] transition-colors cursor-pointer"
          title="Actualiser le diagnostic"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {loading && !data ? (
        <div className="py-12 text-center text-sm text-[#736B5E]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#B8882C]" />
          Analyse des services et du serveur en cours...
        </div>
      ) : (
        <>
          {/* Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Card 1: Server Status */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DFCF] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#736B5E]">API Serveur</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2A7545] bg-[#EAF5EE] px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  Opérationnel
                </span>
              </div>
              <p className="text-xs text-[#524B40] pt-1">
                Port : <strong>3000</strong> (Express + Node.js)
              </p>
              <p className="text-xs text-[#524B40]">
                E-mail destinataire : <strong>samuelbashimbirwa@gmail.com</strong>
              </p>
            </div>

            {/* Card 2: SMTP Network Connection */}
            <div className="p-4 bg-white rounded-2xl border border-[#E8DFCF] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#736B5E]">Envoi Réseau (SMTP)</span>
                {data?.smtp.connected ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2A7545] bg-[#EAF5EE] px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Connecté
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9E641B] bg-[#FDF2E2] px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-3 h-3" />
                    Mode Journal (Outbox)
                  </span>
                )}
              </div>
              <p className="text-xs text-[#524B40] pt-1">
                {data?.smtp.configured
                  ? `Serveur : ${data.smtp.host}`
                  : "Aucun mot de passe SMTP configuré"}
              </p>
              <p className="text-[11px] text-[#786E5E] truncate">
                {data?.smtp.message}
              </p>
            </div>
          </div>

          {/* Explanation Alert for User */}
          {!data?.smtp.connected && (
            <div className="p-4 rounded-2xl bg-[#FFF9ED] border border-[#ECD9B8] text-xs text-[#6B501B] space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#825313]">
                <Key className="w-4 h-4" />
                <span>Résolution : Configuration du mot de passe Gmail (Erreur 535)</span>
              </div>
              <p className="leading-relaxed">
                Google n'autorise plus l'utilisation du mot de passe standard de votre compte Google pour des applications externes. Pour que vos e-mails soient expédiés vers <strong>samuelbashimbirwa@gmail.com</strong>, vous devez créer un <strong>Mot de passe d'application</strong> (16 lettres) :
              </p>
              <ol className="list-decimal list-inside space-y-1 bg-white/70 p-3 rounded-xl border border-[#EADBBD] text-[11px] text-[#4A3D22]">
                <li>Rendez-vous sur <a href="https://myaccount.google.com/security" target="_blank" rel="noreferrer" className="underline font-bold text-[#825313]">myaccount.google.com/security</a></li>
                <li>Activez la <strong>Validation en deux étapes</strong> (si ce n'est pas déjà fait).</li>
                <li>Dans la barre de recherche du compte Google, tapez <strong>« Mots de passe des applications »</strong> (ou App Passwords).</li>
                <li>Créez-en un nommé <strong>« Kimia »</strong> : Google vous donne un code à 16 lettres (ex: <code>abcd efgh ijkl mnop</code>).</li>
                <li>Collez ce code de 16 lettres dans votre secret <code>SMTP_PASS</code> (sans guillemets).</li>
              </ol>
              <div className="bg-white/80 p-2.5 rounded-xl border border-[#E8DCBF] font-mono text-[11px] flex items-center justify-between">
                <code>SMTP_HOST=smtp.gmail.com | SMTP_PORT=465 | SMTP_USER=samuelbashimbirwa@gmail.com | SMTP_PASS=...</code>
                <button
                  onClick={copyEnvSample}
                  className="ml-2 inline-flex items-center gap-1 text-xs font-sans text-[#825313] hover:underline cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copié" : "Copier"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Trigger Test Email Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-[#EAE2D2]">
            <div>
              <h4 className="font-bold text-sm text-[#1E1C1A]">Lancer un test immédiat</h4>
              <p className="text-xs text-[#736B5E]">
                Déclenche l'envoi d'un message d'essai vers <strong>samuelbashimbirwa@gmail.com</strong>
              </p>
            </div>
            <button
              onClick={handleSendTestEmail}
              disabled={testingEmail}
              className="w-full sm:w-auto px-4 py-2.5 bg-[#D4A346] hover:bg-[#C59639] text-[#1E1C1A] text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              {testingEmail ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>{testingEmail ? "Envoi en cours..." : "Tester l'envoi maintenant"}</span>
            </button>
          </div>

          {testResult && (
            <div className="p-3 bg-[#FAF5EB] rounded-xl border border-[#E3D8C4] text-xs text-[#474034]">
              {testResult}
            </div>
          )}

          {/* Outbox Logs / In-Memory Journal */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-[#1E1C1A] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#B8882C]" />
                <span>Journal des e-mails émis ({data?.outbox.logs.length || 0})</span>
              </h4>
              <span className="text-[11px] text-[#7A7161]">
                {data?.outbox.logs.length === 0 ? "Aucun e-mail émis" : "Historique en direct"}
              </span>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
              {data?.outbox.logs.length === 0 ? (
                <div className="p-6 bg-white rounded-2xl border border-[#EDE5D5] text-center text-xs text-[#7A7161]">
                  Aucun message n'a encore été envoyé. Soumettez un message depuis le formulaire pour le voir apparaître ici.
                </div>
              ) : (
                data?.outbox.logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 bg-white rounded-xl border border-[#E7DFCE] hover:border-[#D4A346] transition-colors text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#1E1C1A] truncate max-w-[280px]">
                        {log.subject}
                      </span>
                      <span className="text-[10px] text-[#857B6B]">
                        {new Date(log.timestamp).toLocaleTimeString("fr-FR")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#696153]">
                      <span>
                        Destinataire : <strong>{log.recipient}</strong>
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.2 rounded-md ${
                          log.deliveredToSmtp
                            ? "bg-[#E6F4EA] text-[#137333]"
                            : "bg-[#F7EFE1] text-[#8A631E]"
                        }`}
                      >
                        {log.deliveredToSmtp ? "Envoyé SMTP" : "Archivé Outbox"}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#544D42] line-clamp-1 italic">
                      « {log.previewSnippet} »
                    </p>

                    <button
                      onClick={() => setSelectedMail(log)}
                      className="inline-flex items-center gap-1 text-[11px] text-[#B8882C] hover:underline font-semibold pt-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Visualiser le contenu de l'e-mail</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Mail Content Inspection Modal / Drawer */}
          {selectedMail && (
            <div className="p-4 bg-white rounded-2xl border border-[#D4A346] shadow-sm space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-[#EDE5D5] pb-2">
                <span className="font-bold text-xs text-[#1E1C1A]">Aperçu du message</span>
                <button
                  onClick={() => setSelectedMail(null)}
                  className="text-xs text-[#7A7161] hover:text-[#1E1C1A] cursor-pointer"
                >
                  Fermer aperçu ✕
                </button>
              </div>
              <div className="text-xs space-y-1 text-[#4F473A]">
                <p>
                  <strong>Objet :</strong> {selectedMail.subject}
                </p>
                <p>
                  <strong>Vers :</strong> {selectedMail.recipient}
                </p>
                <p>
                  <strong>Date :</strong> {new Date(selectedMail.timestamp).toLocaleString("fr-FR")}
                </p>
              </div>
              <div
                className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE5D5] text-xs overflow-x-auto max-h-48"
                dangerouslySetInnerHTML={{ __html: selectedMail.html }}
              />
            </div>
          )}

          {/* Command-line diagnosis reminder */}
          <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#E6DDC8] text-[11px] text-[#69604F] flex items-center justify-between">
            <span>
              💡 Pour lancer le diagnostic en ligne de commande : <code>npm run test:diagnostics</code>
            </span>
          </div>
        </>
      )}
    </div>
  );
};
