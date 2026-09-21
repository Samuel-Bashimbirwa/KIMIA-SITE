export interface Testimony {
  id: string;
  name: string;
  city: string;
  age: number;
  lawTopic: string;
  quote: string;
  story: string;
  videoDuration: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "lois" | "aide" | "livre" | "confidentialite";
}

export interface LawyerPartner {
  name: string;
  title: string;
  bar: string;
  specialty: string;
  city: string;
  proBono: boolean;
}

export interface QuestionSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  province?: string;
}

export type ModalType =
  | "none"
  | "book"
  | "community"
  | "lawyer"
  | "app"
  | "terms"
  | "privacy"
  | "faq"
  | "video"
  | "diagnostics";
