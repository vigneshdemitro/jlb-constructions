/**
 * Metadata Service
 * Fetches site metadata from embedded data or Google Drive
 * Caches results for performance
 */

import { SiteMetadata, Project } from '@/lib/types';
import { listGoogleDriveFolder, GDRIVE_CONFIG } from '@/lib/gdrive.config';
import { SITE_METADATA } from '@/lib/metadata.data';

// Cache metadata to avoid repeated API calls
let metadataCache: SiteMetadata | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

/**
 * Fetch metadata from multiple sources
 * Priority: 1) Google Drive JSON file 2) Embedded metadata data
 */
export async function fetchSiteMetadata(): Promise<SiteMetadata> {
  // Return cached data if still valid
  if (metadataCache && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return metadataCache;
  }

  try {
    // Try to fetch from Google Drive first (if API key is configured)
    if (GDRIVE_CONFIG.API_KEY && GDRIVE_CONFIG.FOLDERS.METADATA) {
      const metadata = await fetchMetadataFromGoogleDrive();
      if (metadata) {
        metadataCache = metadata;
        cacheTimestamp = Date.now();
        return metadata;
      }
    }

    // Fallback to embedded metadata data (works at build time and runtime)
    metadataCache = SITE_METADATA;
    cacheTimestamp = Date.now();
    return SITE_METADATA;
  } catch (error) {
    console.error('Error fetching metadata:', error);
    // Return embedded metadata as fallback
    return SITE_METADATA;
  }
}

/**
 * Fetch metadata JSON from Google Drive metadata folder
 */
async function fetchMetadataFromGoogleDrive(): Promise<SiteMetadata | null> {
  try {
    if (!GDRIVE_CONFIG.FOLDERS.METADATA) {
      console.warn('METADATA folder ID not configured');
      return null;
    }

    // List files in metadata folder
    const files = await listGoogleDriveFolder(GDRIVE_CONFIG.FOLDERS.METADATA);

    // Find metadata.json file
    const metadataFile = files.files?.find(
      (f: any) => f.name === 'metadata.json'
    );

    if (!metadataFile) {
      console.warn('metadata.json not found in Google Drive');
      return null;
    }

    // Fetch the JSON content
    const exportUrl = `https://www.googleapis.com/drive/v3/files/${metadataFile.id}?alt=media&key=${GDRIVE_CONFIG.API_KEY}`;
    const response = await fetch(exportUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch metadata.json: ${response.statusText}`);
    }

    const metadata = await response.json();

    // Process images: convert Google Drive file IDs to public URLs
    if (metadata.projects) {
      metadata.projects = metadata.projects.map((project: Project) => ({
        ...project,
        images: project.images.map((img) => ({
          ...img,
        //   url: getGoogleDriveImageUrl(img.id),
        })),
      }));
    }

    return metadata as SiteMetadata;
  } catch (error) {
    console.error('Error fetching from Google Drive:', error);
    return null;
  }
}

/**
 * Get a specific project by ID
 */
export async function getProjectById(projectId: string): Promise<Project | null> {
  const metadata = await fetchSiteMetadata();
  return metadata.projects.find((p) => p.id === projectId) || null;
}

/**
 * Get all projects filtered by category
 */
export async function getProjectsByCategory(
  category: string
): Promise<Project[]> {
  const metadata = await fetchSiteMetadata();
  return metadata.projects.filter((p) => p.category === category);
}

/**
 * Get featured/latest projects
 */
export async function getFeaturedProjects(limit: number = 6): Promise<Project[]> {
  const metadata = await fetchSiteMetadata();
  return metadata.projects
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/**
 * Get ongoing projects
 */
export async function getOngoingProjects() {
  const metadata = await fetchSiteMetadata();
  return metadata.ongoingProjects || [];
}

/**
 * Get company information
 */
export async function getCompanyInfo() {
  const metadata = await fetchSiteMetadata();
  return metadata.company;
}

/**
 * Get services
 */
export async function getServices() {
  const metadata = await fetchSiteMetadata();
  return metadata.services;
}

/**
 * Refresh metadata cache (useful for admin/CMS)
 */
export function clearMetadataCache() {
  metadataCache = null;
  cacheTimestamp = 0;
}