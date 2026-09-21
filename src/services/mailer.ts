import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export interface MailDeliveryResult {
  deliveredToSmtp: boolean;
  mode: "smtp" | "memory_log";
  recipient: string;
  subject: string;
  timestamp: string;
  error?: string;
  messageId?: string;
}

export interface MailLogEntry extends MailDeliveryResult {
  id: string;
  from: string;
  replyTo?: string;
  previewSnippet: string;
  html: string;
}

// In-memory outbox log so the user can inspect every single email sent in real time
export const emailOutboxLogs: MailLogEntry[] = [];

/**
 * Parses key-value pairs from .env.example as a seamless configuration fallback
 */
function parseEnvExampleFallback(): Record<string, string> {
  const result: Record<string, string> = {};
  try {
    const envPath = path.resolve(process.cwd(), ".env.example");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const lines = content.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1).trim();
          }
          if (val) {
            result[key] = val;
          }
        }
      }
    }
  } catch (e) {
    // Non-blocking
  }
  return result;
}

export interface EffectiveSmtpConfig {
  host: string | null;
  port: number;
  user: string | null;
  pass: string | null;
  from: string;
  secure: boolean;
  isConfigured: boolean;
}

/**
 * Returns effective SMTP configuration from process.env or fallback to .env.example
 */
export function getEffectiveSmtpConfig(): EffectiveSmtpConfig {
  const fallback = parseEnvExampleFallback();

  const host = (process.env.SMTP_HOST || fallback.SMTP_HOST || "").trim() || null;
  const rawPort = (process.env.SMTP_PORT || fallback.SMTP_PORT || "465").trim();
  const port = parseInt(rawPort, 10) || 465;
  const user = (process.env.SMTP_USER || fallback.SMTP_USER || "").trim() || null;
  
  // Retrieve password: if .env.example contains a valid 16-character App Password (like "lhdw kzro nsin mxld")
  // and process.env.SMTP_PASS has a stale value that failed, prioritize the fresh App Password.
  let rawPass = "";
  const envExamplePass = (fallback.SMTP_PASS || "").trim();
  const processEnvPass = (process.env.SMTP_PASS || "").trim();

  // A Google App Password is 16 letters (or 19 chars with 3 spaces)
  const isAppPassPattern = (val: string) => /^[a-z]{4}\s?[a-z]{4}\s?[a-z]{4}\s?[a-z]{4}$/i.test(val);

  if (isAppPassPattern(envExamplePass)) {
    rawPass = envExamplePass;
  } else if (processEnvPass) {
    rawPass = processEnvPass;
  } else if (envExamplePass) {
    rawPass = envExamplePass;
  }

  if ((rawPass.startsWith('"') && rawPass.endsWith('"')) || (rawPass.startsWith("'") && rawPass.endsWith("'"))) {
    rawPass = rawPass.slice(1, -1).trim();
  }

  // If this is a Google App Password (e.g. 16 characters with spaces like "lhdw kzro nsin mxld"), remove spaces
  let pass: string | null = null;
  if (rawPass) {
    const isGmail = host ? host.toLowerCase().includes("gmail.com") : false;
    // If it looks like a 16-character google app password with spaces (4x4 blocks), remove internal whitespace
    if (isGmail && /\s/.test(rawPass)) {
      pass = rawPass.replace(/\s+/g, "");
    } else {
      pass = rawPass;
    }
  }

  const rawFrom = process.env.SMTP_FROM || fallback.SMTP_FROM || user || "samuelbashimbirwa@gmail.com";
  const secure = (process.env.SMTP_SECURE || fallback.SMTP_SECURE) === "true" || port === 465;

  return {
    host,
    port,
    user,
    pass,
    from: rawFrom,
    secure,
    isConfigured: Boolean(host && user && pass),
  };
}

/**
 * Creates the transporter based on environment variables.
 * If host, user, pass are provided, it attempts real SMTP dispatch.
 * Otherwise, returns null.
 */
export function getMailTransporter() {
  const config = getEffectiveSmtpConfig();

  if (!config.isConfigured || !config.host || !config.user || !config.pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    // Standard connection timeouts
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

function formatSmtpError(rawError: string): string {
  if (rawError.includes("535-5.7.8") || rawError.includes("BadCredentials") || rawError.includes("Username and Password not accepted")) {
    return "Authentification Gmail refusée (Erreur 535) : Google exige un 'Mot de passe d'application' à 16 caractères (généré dans 'Sécurité' de votre compte Google), et non le mot de passe habituel du compte.";
  }
  return rawError;
}

/**
 * Sends an email with graceful fallback and real-time logging
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendMailOptions): Promise<MailDeliveryResult> {
  const timestamp = new Date().toISOString();
  const logId = `MAIL-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
  const config = getEffectiveSmtpConfig();
  const fromAddress = config.from || "samuelbashimbirwa@gmail.com";

  const transporter = getMailTransporter();

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `"MALK'ia — Droits des Femmes RDC" <${fromAddress}>`,
        to,
        subject,
        text: text || html.replace(/<[^>]*>?/gm, ""),
        html,
        replyTo,
      });

      const entry: MailLogEntry = {
        id: logId,
        deliveredToSmtp: true,
        mode: "smtp",
        recipient: to,
        from: fromAddress,
        replyTo,
        subject,
        timestamp,
        messageId: info.messageId,
        previewSnippet: text ? text.slice(0, 150) : html.replace(/<[^>]*>?/gm, "").slice(0, 150),
        html,
      };

      emailOutboxLogs.unshift(entry);
      if (emailOutboxLogs.length > 50) emailOutboxLogs.pop();

      return {
        deliveredToSmtp: true,
        mode: "smtp",
        recipient: to,
        subject,
        timestamp,
        messageId: info.messageId,
      };
    } catch (smtpError: any) {
      const rawMsg = smtpError.message || "Erreur de connexion au serveur SMTP";
      const friendlyError = formatSmtpError(rawMsg);
      console.warn(`[Kimia Mailer Warning] Relais SMTP non abouti: ${friendlyError}`);

      const entry: MailLogEntry = {
        id: logId,
        deliveredToSmtp: false,
        mode: "smtp",
        recipient: to,
        from: fromAddress,
        replyTo,
        subject,
        timestamp,
        error: friendlyError,
        previewSnippet: text ? text.slice(0, 150) : html.replace(/<[^>]*>?/gm, "").slice(0, 150),
        html,
      };

      emailOutboxLogs.unshift(entry);
      if (emailOutboxLogs.length > 50) emailOutboxLogs.pop();

      return {
        deliveredToSmtp: false,
        mode: "smtp",
        recipient: to,
        subject,
        timestamp,
        error: friendlyError,
      };
    }
  }

  // Fallback: SMTP is not configured, record in outbox log with clear explanation
  const entry: MailLogEntry = {
    id: logId,
    deliveredToSmtp: false,
    mode: "memory_log",
    recipient: to,
    from: fromAddress,
    replyTo,
    subject,
    timestamp,
    error: "Aucun serveur SMTP externe configuré (SMTP_HOST, SMTP_USER, SMTP_PASS manquants). L'e-mail est sauvegardé dans le journal Kimia.",
    previewSnippet: text ? text.slice(0, 150) : html.replace(/<[^>]*>?/gm, "").slice(0, 150),
    html,
  };

  emailOutboxLogs.unshift(entry);
  if (emailOutboxLogs.length > 50) emailOutboxLogs.pop();

  return {
    deliveredToSmtp: false,
    mode: "memory_log",
    recipient: to,
    subject,
    timestamp,
    error: entry.error,
  };
}

/**
 * Diagnostic helper to test the SMTP connection
 */
export async function verifySmtpConnection(): Promise<{
  configured: boolean;
  connected: boolean;
  message: string;
  details?: any;
}> {
  const config = getEffectiveSmtpConfig();

  if (!config.isConfigured || !config.host || !config.user || !config.pass) {
    return {
      configured: false,
      connected: false,
      message:
        "Les variables SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS) ne sont pas encore définies dans l'environnement.",
      details: {
        hostSet: Boolean(config.host),
        userSet: Boolean(config.user),
        passSet: Boolean(config.pass),
      },
    };
  }

  const transporter = getMailTransporter();
  if (!transporter) {
    return {
      configured: false,
      connected: false,
      message: "Impossible de créer le transporteur SMTP.",
    };
  }

  try {
    await transporter.verify();
    return {
      configured: true,
      connected: true,
      message: `Connexion SMTP réussie avec le serveur ${config.host} (${config.user}) ! Les e-mails seront envoyés directement dans la boîte de réception.`,
    };
  } catch (err: any) {
    const raw = err.message || "";
    const cleanMsg = formatSmtpError(raw);
    return {
      configured: true,
      connected: false,
      message: `Échec du test de connexion SMTP : ${cleanMsg}`,
      details: err,
    };
  }
}
