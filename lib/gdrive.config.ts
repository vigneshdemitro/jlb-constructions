/**
 * Google Drive Configuration
 * Handles authentication and API setup for reading project metadata and images
 */

export const GDRIVE_CONFIG = {
  // Get this from Google Cloud Console
  API_KEY: process.env.NEXT_PUBLIC_GDRIVE_API_KEY || '',
  
  // Your Google Drive folder IDs
  FOLDERS: {
    // Create this folder in Google Drive: GDrive/jlb-construction/site-images
    SITE_IMAGES: process.env.NEXT_PUBLIC_GDRIVE_SITE_IMAGES_FOLDER_ID || '',
    
    // Optional: Separate folder for metadata (JSON files)
    METADATA: process.env.NEXT_PUBLIC_GDRIVE_METADATA_FOLDER_ID || '',
  },

  // API limits
  PAGE_SIZE: 100,
  MAX_RESULTS: 1000,
};

/**
 * Get public Google Drive link for an image
 * Convert from: https://drive.google.com/file/d/{fileId}/view
 * To: https://drive.google.com/uc?export=view&id={fileId}
 */
export function getGoogleDriveImageUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

/**
 * Alternative: Get downloadable URL
 */
export function getGoogleDriveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

/**
 * List contents of a Google Drive folder
 * Requires GDRIVE_API_KEY to be set
 */
export async function listGoogleDriveFolder(
  folderId: string,
  pageToken?: string
) {
  const query = `'${folderId}' in parents and trashed=false`;
  const params = new URLSearchParams({
    q: query,
    spaces: 'drive',
    fields: 'nextPageToken, files(id, name, mimeType, webViewLink, createdTime)',
    pageSize: GDRIVE_CONFIG.PAGE_SIZE.toString(),
    key: GDRIVE_CONFIG.API_KEY,
  });

  if (pageToken) {
    params.append('pageToken', pageToken);
  }

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?${params}`
  );

  if (!response.ok) {
    throw new Error(`Failed to list Google Drive folder: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get file metadata from Google Drive
 */
export async function getGoogleDriveFileMetadata(fileId: string) {
  const params = new URLSearchParams({
    fields: 'id, name, mimeType, webViewLink, createdTime, parents',
    key: GDRIVE_CONFIG.API_KEY,
  });

  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?${params}`
  );

  if (!response.ok) {
    throw new Error(`Failed to get file metadata: ${response.statusText}`);
  }

  return response.json();
}