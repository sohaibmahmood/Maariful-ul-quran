export type PageId =
  | 'home'
  | 'courses'
  | 'about'
  | 'trial'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'admin';

export interface CourseItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  suitableLevel: string;
  audienceTag: 'children' | 'adults' | 'all';
  highlights: string[];
  image: string;
}

export interface TestimonialItem {
  id: string;
  parentFirstName: string;
  studentCourse?: string;
  review: string;
  published: boolean;
  createdAt: string;
}

export interface TrialSubmission {
  id: string;
  referenceCode: string;
  parentFullName: string;
  studentFullName: string;
  studentAge: string;
  country: string;
  whatsappNumber: string;
  courseInterestedIn: string;
  currentLearningLevel: string;
  preferredClassTiming: string;
  additionalMessage?: string;
  status: 'pending' | 'scheduled' | 'completed';
  createdAt: string;
}

export interface EnquirySubmission {
  id: string;
  referenceCode: string;
  fullName: string;
  emailAddress?: string;
  whatsappNumber: string;
  subject: string;
  message: string;
  status: 'new' | 'replied';
  createdAt: string;
}

export interface SiteContent {
  academyName: string;
  tagline: string;
  whatsappDisplay: string;
  whatsappIntl: string;
  email: string;
  heroHeading: string;
  heroSubheading: string;
  heroDescription: string;
  aboutHeading: string;
  aboutSubheading: string;
  aboutMission: string;
  aboutVision: string;
  feesApproachTitle: string;
  feesApproachQuote: string;
}
