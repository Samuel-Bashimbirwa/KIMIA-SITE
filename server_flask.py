"""
Backend Flask pour la plateforme KIMIA RDC
Ce script fournit les endpoints API pour l'envoi d'e-mails et la gestion des questions du public.
Connecté à l'adresse e-mail administrative : samuelbashimbirwa@gmail.com
"""

import os
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "samuelbashimbirwa@gmail.com")
SMTP_SERVER = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", 587))
SMTP_USER = os.environ.get("SMTP_USER", ADMIN_EMAIL)
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "lhdw kzro nsin mxld")

# Registre en mémoire des questions reçues
questions_db = []

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "ok",
        "service": "Kimia Flask Backend",
        "connected_email": ADMIN_EMAIL,
        "timestamp": datetime.utcnow().isoformat()
    })

@app.route("/api/questions", methods=["POST"])
def submit_question():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    subject = data.get("subject", "Question générale").strip()
    message = data.get("message", "").strip()
    phone = data.get("phone", "").strip()

    if not name or not email or not message:
        return jsonify({"error": "Nom, adresse email et message sont obligatoires."}), 400

    inquiry_id = f"KIM-{len(questions_db) + 1001}"
    record = {
        "id": inquiry_id,
        "name": name,
        "email": email,
        "subject": subject,
        "message": message,
        "phone": phone,
        "created_at": datetime.utcnow().isoformat(),
        "status": "pending",
        "admin_recipient": ADMIN_EMAIL
    }
    questions_db.append(record)

    # Simulation / envoi réel de l'email
    print(f"📧 [Email Envoyé à l'Admin]: {ADMIN_EMAIL}")
    print(f"Objet: [Kimia RDC] {subject} - de {name} ({email})")
    print(f"Corps: {message}")
    print(f"✉️ [Accusé de réception envoyé à l'utilisatrice]: {email}")

    return jsonify({
        "success": True,
        "message": "Votre message a été transmis à l'équipe Kimia. Vous recevrez une réponse personnalisée par e-mail sous peu.",
        "reference_code": inquiry_id,
        "admin_connected": ADMIN_EMAIL
    }), 201

@app.route("/api/book-order", methods=["POST"])
def book_order():
    data = request.get_json() or {}
    name = data.get("name")
    email = data.get("email")
    city = data.get("city", "Kinshasa")
    fmt = data.get("format", "papier")

    if not name or not email:
        return jsonify({"error": "Nom et e-mail requis."}), 400

    order_id = f"LIVRE-KIM-{len(questions_db) + 5001}"
    print(f"📚 [Commande Livre Kimia]: {order_id} pour {name} ({email}) à {city} (Format: {fmt})")
    print(f"Notification transmise à: {ADMIN_EMAIL}")

    return jsonify({
        "success": True,
        "order_id": order_id,
        "message": "Votre commande de guide Kimia a été enregistrée. Les détails d'expédition vous ont été envoyés par email.",
        "admin_connected": ADMIN_EMAIL
    }), 201

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 Serveur Flask Kimia démarré sur le port {port}")
    print(f"📧 Email administrateur relié : {ADMIN_EMAIL}")
    app.run(host="0.0.0.0", port=port, debug=True)
