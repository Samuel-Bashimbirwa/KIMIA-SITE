import { Testimony, FaqItem, LawyerPartner } from "../types";

export const TESTIMONIALS: Testimony[] = [
  {
    id: "amani-goma",
    name: "Amani M.",
    city: "Goma, Nord-Kivu",
    age: 29,
    lawTopic: "Loi n° 06/018 sur les violences sexuelles",
    quote: "J'ignorais que la loi prévoyait des sanctions aussi fermes et une assistance médicale gratuite.",
    story: "Après des mois de silence face au harcèlement de mon supérieur hiérarchique, le guide Kimia m'a permis d'identifier précisément les articles de loi applicables. Avec l'aide d'une avocate partenaire, j'ai osé porter plainte et obtenir justice.",
    videoDuration: "1:45 min",
  },
  {
    id: "grace-kinshasa",
    name: "Grâce K.",
    city: "Kinshasa, Lingwala",
    age: 34,
    lawTopic: "Code de la Famille révisé (Loi n° 16/008)",
    quote: "J'ai appris que mes droits de succession et la gestion de mes biens propres étaient garantis.",
    story: "À la disparition de mon époux, ma belle-famille a tenté de m'expulser avec mes deux filles. Grâce aux conseils de Kimia et aux références précises du Code de la Famille, j'ai pu défendre notre foyer en justice.",
    videoDuration: "2:10 min",
  },
  {
    id: "neema-bukavu",
    name: "Neema B.",
    city: "Bukavu, Sud-Kivu",
    age: 26,
    lawTopic: "Protection contre les violences physiques et morales",
    quote: "Kimia a été ma boussole quand je me sentais isolée et démunie.",
    story: "La communauté Kimia m'a accueillie avec bienveillance. Avoir accès à un numéro d'écoute et à des juristes dévoués m'a donné le courage de reconstruire ma vie en toute sécurité.",
    videoDuration: "1:55 min",
  },
  {
    id: "esperance-lubumbashi",
    name: "Espérance T.",
    city: "Lubumbashi, Haut-Katanga",
    age: 41,
    lawTopic: "Convention CEDEF / Protocole de Maputo",
    quote: "Les traités internationaux ratifiés par la RDC sont une arme juridique concrète.",
    story: "En tant qu'enseignante, j'ai distribué le guide Kimia à toutes les mères d'élèves de mon quartier. Savoir identifier les abus dès les premiers signes a permis de sauver plusieurs jeunes filles.",
    videoDuration: "2:30 min",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: "lois",
    question: "Quelles sont les lois principales en RDC protégeant les femmes contre les violences ?",
    answer: "La Constitution de la RDC (Articles 14 et 15), la Loi n° 06/018 modifiant le Code Pénal congolais sur les violences sexuelles, la Loi n° 16/008 révisant le Code de la Famille (suppression de l'autorisation maritale, égalité successorale), ainsi que les instruments internationaux ratifiés par la RDC, notamment le Protocole de Maputo et la Convention CEDAW.",
  },
  {
    category: "aide",
    question: "Comment puis-je contacter un avocat partenaire de MALK'ia gratuitement ?",
    answer: "Vous pouvez soumettre une demande via notre formulaire ou notre ligne directe. MALK'ia collabore avec des barreaux et des associations de femmes juristes en RDC (AFEJUCO, CAFCO) qui offrent des permanences juridiques d'orientation sans frais.",
  },
  {
    category: "livre",
    question: "Comment se procurer le livre « L'ABC des Violences Basées sur le Genre » par NGOIE WA NGOIE ?",
    answer: "Le livre de NGOIE WA NGOIE est disponible en format papier distribué dans nos points relais à Kinshasa, Goma, Lubumbashi, Bukavu et Kisangani. Une version numérique PDF est également accessible gratuitement pour les étudiantes, associations et personnes en situation de vulnérabilité.",
  },
  {
    category: "confidentialite",
    question: "Mes messages et mes demandes restent-ils strictement confidentiels ?",
    answer: "Oui, la confidentialité et la sécurité de chaque femme sont notre priorité absolue. Vos coordonnées et messages ne sont jamais partagés avec des tiers non autorisés. Vous pouvez également utiliser notre messagerie sous un pseudonyme si vous craignez pour votre sécurité.",
  },
  {
    category: "livre",
    question: "Le guide est-il rédigé en langues nationales congolaises ?",
    answer: "Le livre principal est en français accessible, avec des fiches de synthèse et infographies traduites en Lingala, Swahili, Tshiluba et Kikongo dans notre application mobile.",
  },
];

export const LAWYER_PARTNERS: LawyerPartner[] = [
  {
    name: "Me Patricia Mbuyi",
    title: "Avocate au Barreau de Kinshasa / Matete",
    bar: "Barreau de Kinshasa",
    specialty: "Droits des femmes, Droit de la famille, Violences basées sur le genre",
    city: "Kinshasa",
    proBono: true,
  },
  {
    name: "Me Judith Kanyere",
    title: "Avocate au Barreau du Nord-Kivu",
    bar: "Barreau de Goma",
    specialty: "Protection des droits humains, Droit pénal spécial",
    city: "Goma",
    proBono: true,
  },
  {
    name: "Me Célestin Kalala",
    title: "Avocat au Barreau du Haut-Katanga",
    bar: "Barreau de Lubumbashi",
    specialty: "Successions, Droit du travail et harcèlement",
    city: "Lubumbashi",
    proBono: true,
  },
  {
    name: "Me Francine Nabintu",
    title: "Avocate au Barreau du Sud-Kivu",
    bar: "Barreau de Bukavu",
    specialty: "Assistance judiciaire aux victimes et réparations",
    city: "Bukavu",
    proBono: true,
  },
];
