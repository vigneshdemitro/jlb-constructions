
/**
 * Type definitions for the metadata-driven portfolio system
 */

export interface ProjectImage {
  id: string; // Google Drive file ID
  name: string; // File name
  url: string; // Public URL to display
  order: number; // Display order (1, 2, 3, etc.)
  caption?: string; // Optional image caption
}

export interface Project {
  id: string; // Unique project ID (kebab-case)
  title: string; // Project name (same as folder name in Google Drive)
  category: 'commercial' | 'residential' | 'renovation'; // Project type
  description: string; // Project description (150-250 words)
  longDescription?: string; // Optional detailed description
  date: string; // Completion date (YYYY-MM-DD)
  year: string; // Year completed (2024, 2023, etc.)
  status: 'completed' | 'in-progress' | 'planning';
  location?: string; // Project location/city
  client?: string; // Client name (optional for privacy)
  budget?: string; // Project budget range (optional)
  team?: string[]; // Team members involved (optional)
  features?: string[]; // Key features/highlights
  technologies?: string[]; // Building tech/materials used
  images: ProjectImage[]; // Array of images from Google Drive
  featuredImageId?: number; // Index of featured/hero image (0-based)
  tags?: string[]; // SEO tags
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji or icon name
  features?: string[];
}

export interface OngoingProject {
  id: string;
  title: string;
  description: string;
  progress: number; // 0-100
  expectedCompletion: string; // "Q2 2024" or "June 2024"
  startDate: string; // YYYY-MM-DD
  category: 'commercial' | 'residential' | 'renovation';
  heroImageId?: string; // Google Drive file ID
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  hours?: {
    weekday: string;
    weekend: string;
  };
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  stats: {
    projectsCompleted: number;
    clientSatisfaction: number; // 0-100
    yearsInBusiness: number;
  };
}

export interface SiteMetadata {
  company: CompanyInfo;
  projects: Project[];
  services: Service[];
  ongoingProjects: OngoingProject[];
  heroContent?: {
    mainHeading: string;
    subheading: string;
    ctaText: string;
  };
}
