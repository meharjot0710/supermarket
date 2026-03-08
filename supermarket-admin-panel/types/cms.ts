// CMS editable content types (stored in MongoDB)

export interface HeroContent {
  _id?: string;
  tagline: string;
  headline: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  insightLabel: string;
  insightQuote: string;
}

export interface ListItem {
  _id?: string;
  name: string;
  order: number;
}

export interface ProductRecord {
  _id?: string;
  id: string; // slug or unique id for frontend
  name: string;
  category: string;
  brand: string;
  image: string;
  unit: string;
  minOrder: string;
  description: string;
}

export interface LeadershipProfile {
  _id?: string;
  name: string;
  title: string;
  shortMessage: string;
  order: number;
}

export interface JobListing {
  _id?: string;
  title: string;
  location: string;
  type: string; // e.g. Full-time, Part-time
  description: string;
  order: number;
  active: boolean;
}

export interface NewsletterContent {
  _id?: string;
  heading: string;
  subheading: string;
  buttonText: string;
  successMessage: string;
}

export interface FormContent {
  _id?: string;
  formId: string; // e.g. "signup", "contact"
  title: string;
  introText: string;
  confirmationMessage: string;
  submitButtonText: string;
}

export interface SeoFields {
  _id?: string;
  pageKey: string; // e.g. "home", "about", "products", "contact"
  pageTitle: string;
  metaDescription: string;
}
