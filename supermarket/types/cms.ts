export interface HeroContent {
  tagline: string;
  headline: string;
  subtitle: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  insightLabel: string;
  insightQuote: string;
}

export interface ListItem {
  name: string;
  order: number;
}

export interface ProductRecord {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  unit: string;
  minOrder: string;
  description?: string;
}

export interface LeadershipProfile {
  name: string;
  title: string;
  shortMessage: string;
  order: number;
}

export interface JobListing {
  title: string;
  location: string;
  type: string;
  description: string;
  order: number;
  active: boolean;
}

export interface NewsletterContent {
  heading: string;
  subheading: string;
  buttonText: string;
  successMessage: string;
  pdfFileName?: string;
  hasPdf?: boolean;
}

export interface FormContent {
  formId: string;
  title: string;
  introText: string;
  confirmationMessage: string;
  submitButtonText: string;
}

export interface SeoFields {
  pageKey: string;
  pageTitle: string;
  metaDescription: string;
}
