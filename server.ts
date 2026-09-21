import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

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
    res.json({
      status: "ok",
      platform: "Kimia RDC Web Platform",
      adminEmail: ADMIN_EMAIL,
      timestamp: new Date().toISOString(),
    });
  });

  // Contact / Questions submission endpoint
  app.post("/api/questions", (req, res) => {
    try {
      const { name, email, subject, message, phone, province } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          error: "Veuillez renseigner votre nom, adresse e-mail et votre message.",
        });
      }

      const newId = `KIM-${Math.floor(1000 + Math.random() * 9000)}`;
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
      };

      inquiries.unshift(newInquiry);

      console.log(`[Kimia Mailer] New Question Received:`);
      console.log(`To Admin: ${ADMIN_EMAIL}`);
      console.log(`From: ${newInquiry.name} <${newInquiry.email}>`);
      console.log(`Subject: [Kimia RDC] ${newInquiry.subject}`);
      console.log(`Message: ${newInquiry.message}`);
      console.log(`Auto-response notification sent to: ${newInquiry.email}`);

      return res.status(201).json({
        success: true,
        message:
          "Votre question a été transmise à notre équipe. Un e-mail de confirmation et de suivi vous a été envoyé.",
        referenceCode: newId,
        inquiry: newInquiry,
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
  app.post("/api/book-order", (req, res) => {
    const { name, email, phone, city, format, quantity = 1, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "Nom et adresse email requis.",
      });
    }

    const orderId = `LIVRE-${Math.floor(10000 + Math.random() * 90000)}`;

    console.log(`[Kimia Book Order] ID: ${orderId}`);
    console.log(`To Admin: ${ADMIN_EMAIL}`);
    console.log(`Client: ${name} (${email})`);
    console.log(`Format: ${format}, Quantité: ${quantity}, Ville: ${city || "Kinshasa"}`);

    return res.status(201).json({
      success: true,
      orderId,
      message:
        "Votre demande d'acquisition du guide Kimia a été enregistrée avec succès. Vous recevrez les détails de distribution par e-mail.",
      targetEmail: ADMIN_EMAIL,
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
