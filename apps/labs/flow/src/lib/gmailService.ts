/**
 * Gmail Ingestion Service
 * Handles Google Identity Services (GIS) OAuth 2.0 and Gmail REST API v1
 * Scope: https://www.googleapis.com/auth/gmail.readonly (Read-Only)
 */

import { IngestionThread } from '../types';

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: {
              access_token?: string;
              error?: string;
              expires_in?: number;
              error_description?: string;
            }) => void;
            error_callback?: (err: any) => void;
          }) => {
            requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
          };
          revoke?: (token: string, done?: () => void) => void;
        };
      };
    };
  }
}

const GMAIL_SCOPE = 'https://www.googleapis.com/auth/gmail.readonly';
const STORAGE_KEY_TOKEN = 'flow_gmail_access_token';
const STORAGE_KEY_TOKEN_EXPIRY = 'flow_gmail_token_expires_at';
const STORAGE_KEY_CLIENT_ID = 'flow_gmail_client_id';
const STORAGE_KEY_EMAIL = 'flow_gmail_user_email';
const STORAGE_KEY_LAST_SYNC = 'flow_gmail_last_sync_timestamp';

export interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

export interface GmailSyncResult {
  threads: IngestionThread[];
  mode: 'initial_2days' | 'incremental_1day';
  timestamp: string;
  count: number;
}

/**
 * Dynamically loads the Google Identity Services client script if not already present.
 */
export async function loadGoogleScript(): Promise<void> {
  if (window.google?.accounts?.oauth2) return;

  return new Promise((resolve, reject) => {
    const existing = document.getElementById('google-gsi-script');
    if (existing) {
      if (window.google?.accounts?.oauth2) {
        resolve();
      } else {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', (err) => reject(err));
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-gsi-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
    document.head.appendChild(script);
  });
}

const STORAGE_KEY_TOKEN_CLIENT = 'flow_gmail_token_client_id';

/**
 * Gets the configured Client ID from Vite env or localStorage
 */
export function getGoogleClientId(): string {
  const envVal = (import.meta.env.VITE_GOOGLE_CLIENT_ID as string)?.trim();
  const custom = localStorage.getItem(STORAGE_KEY_CLIENT_ID)?.trim();

  // If environment variable is configured, ensure it is synchronized with localStorage
  if (envVal) {
    if (custom !== envVal) {
      localStorage.setItem(STORAGE_KEY_CLIENT_ID, envVal);
      // If client ID changed, clear outdated token for safety
      localStorage.removeItem(STORAGE_KEY_TOKEN);
      localStorage.removeItem(STORAGE_KEY_TOKEN_EXPIRY);
      localStorage.removeItem(STORAGE_KEY_TOKEN_CLIENT);
    }
    return envVal;
  }

  if (custom && custom.length > 0) return custom;
  return '';
}

/**
 * Saves a custom Client ID to localStorage
 */
export function setGoogleClientId(clientId: string): void {
  localStorage.setItem(STORAGE_KEY_CLIENT_ID, clientId.trim());
}

/**
 * Checks if user is marked as connected
 */
export function isGmailConnected(): boolean {
  return !!localStorage.getItem(STORAGE_KEY_EMAIL);
}

/**
 * Gets cached access token if available and not expired
 */
export function getCachedAccessToken(): string | null {
  const currentClientId = getGoogleClientId();
  const tokenClientId = localStorage.getItem(STORAGE_KEY_TOKEN_CLIENT);
  if (tokenClientId && currentClientId && tokenClientId !== currentClientId) {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_TOKEN_EXPIRY);
    localStorage.removeItem(STORAGE_KEY_TOKEN_CLIENT);
    return null;
  }

  const token = localStorage.getItem(STORAGE_KEY_TOKEN);
  const expiry = localStorage.getItem(STORAGE_KEY_TOKEN_EXPIRY);
  if (!token) return null;

  // Check if token has expired (with 60-second safety window)
  if (expiry && Date.now() > parseInt(expiry, 10)) {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_TOKEN_EXPIRY);
    return null;
  }

  return token;
}

/**
 * Clears stored tokens and revokes OAuth session
 */
export function disconnectGmail(): void {
  const token = localStorage.getItem(STORAGE_KEY_TOKEN);
  if (token && window.google?.accounts?.oauth2?.revoke) {
    try {
      window.google.accounts.oauth2.revoke(token, () => {});
    } catch {
      // Ignore revocation failure
    }
  }
  localStorage.removeItem(STORAGE_KEY_TOKEN);
  localStorage.removeItem(STORAGE_KEY_TOKEN_EXPIRY);
  localStorage.removeItem(STORAGE_KEY_EMAIL);
  localStorage.removeItem(STORAGE_KEY_LAST_SYNC);
}

/**
 * Requests OAuth Access Token via Google Identity Services Popup.
 * Uses prompt: 'consent' on first connect or when forceConsent=true,
 * and prompt: '' for silent background refresh when already granted.
 */
export async function authenticateGmail(
  clientId?: string,
  forceConsent: boolean = false
): Promise<string> {
  await loadGoogleScript();

  const id = clientId || getGoogleClientId();
  if (!id) {
    throw new Error('Google Client ID is missing. Please configure a Client ID first.');
  }

  return new Promise((resolve, reject) => {
    try {
      const tokenClient = window.google!.accounts.oauth2.initTokenClient({
        client_id: id,
        scope: GMAIL_SCOPE,
        callback: (resp) => {
          if (resp.error) {
            reject(new Error(resp.error_description || `OAuth Error: ${resp.error}`));
            return;
          }
          if (resp.access_token) {
            localStorage.setItem(STORAGE_KEY_TOKEN, resp.access_token);
            localStorage.setItem(STORAGE_KEY_TOKEN_CLIENT, id);

            // Record token expiration time
            if (resp.expires_in) {
              const expiresAt = Date.now() + (resp.expires_in - 60) * 1000;
              localStorage.setItem(STORAGE_KEY_TOKEN_EXPIRY, expiresAt.toString());
            }

            resolve(resp.access_token);
          } else {
            reject(new Error('No access token returned from Google Identity Services'));
          }
        },
        error_callback: (err) => {
          reject(new Error(err?.message || 'Google OAuth failed to initialize'));
        },
      });

      tokenClient.requestAccessToken({ prompt: forceConsent ? 'consent' : '' });
    } catch (err: any) {
      reject(new Error(err?.message || 'Failed to trigger Google authentication popup'));
    }
  });
}

/**
 * Fetches user Gmail profile to confirm identity
 */
export async function fetchGmailProfile(accessToken: string): Promise<GmailProfile> {
  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
      throw new Error('OAuth session expired. Please reconnect your account.');
    }
    throw new Error(`Failed to fetch profile: ${res.statusText}`);
  }

  const profile = (await res.json()) as GmailProfile;
  localStorage.setItem(STORAGE_KEY_EMAIL, profile.emailAddress);
  return profile;
}

/**
 * Base64 URL decoder for Gmail message payloads
 */
function decodeBase64(str: string): string {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  }
}

/**
 * Extracts plain text or formatted body from Gmail message payload parts
 */
function extractBodyFromPayload(payload: any): string {
  if (!payload) return '';

  if (payload.body && payload.body.data) {
    return decodeBase64(payload.body.data);
  }

  if (payload.parts && Array.isArray(payload.parts)) {
    // Try text/plain first
    const plainPart = payload.parts.find((p: any) => p.mimeType === 'text/plain');
    if (plainPart && plainPart.body && plainPart.body.data) {
      return decodeBase64(plainPart.body.data);
    }

    // Try text/html second
    const htmlPart = payload.parts.find((p: any) => p.mimeType === 'text/html');
    if (htmlPart && htmlPart.body && htmlPart.body.data) {
      const html = decodeBase64(htmlPart.body.data);
      // Strip tags for clean text preview
      return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
    }

    // Nested multipart recursion
    for (const part of payload.parts) {
      const nested = extractBodyFromPayload(part);
      if (nested) return nested;
    }
  }

  return '';
}

/**
 * Fetches Gmail threads according to sync rules:
 * - First time connect: Last 2 days (`newer_than:2d in:inbox`)
 * - Subsequent fetch: Last 1 day (`newer_than:1d in:inbox`)
 */
export async function syncGmailInbox(
  accessToken: string,
  isInitialConnect: boolean = false
): Promise<GmailSyncResult> {
  const query = isInitialConnect ? 'newer_than:2d in:inbox' : 'newer_than:1d in:inbox';
  const url = `https://gmail.googleapis.com/gmail/v1/users/me/threads?q=${encodeURIComponent(
    query
  )}&maxResults=25`;

  const listRes = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!listRes.ok) {
    if (listRes.status === 401) {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
      throw new Error('OAuth token expired. Please reconnect.');
    }
    throw new Error(`Gmail API error: ${listRes.statusText}`);
  }

  const listData = await listRes.json();
  const rawThreads: { id: string; snippet?: string }[] = listData.threads || [];

  if (rawThreads.length === 0) {
    return {
      threads: [],
      mode: isInitialConnect ? 'initial_2days' : 'incremental_1day',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      count: 0,
    };
  }

  // Fetch full details for the top 15 threads
  const detailPromises = rawThreads.slice(0, 15).map(async (t) => {
    try {
      const detailRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/threads/${t.id}?format=full`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!detailRes.ok) return null;
      return await detailRes.json();
    } catch {
      return null;
    }
  });

  const details = await Promise.all(detailPromises);
  const parsedThreads: IngestionThread[] = [];

  details.forEach((th, idx) => {
    if (!th || !th.messages || th.messages.length === 0) return;

    const firstMsg = th.messages[0];
    const headers = firstMsg.payload?.headers || [];

    const getHeader = (name: string) =>
      headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())?.value || '';

    const subject = getHeader('Subject') || '(No Subject)';
    const fromRaw = getHeader('From') || 'Unknown Sender';
    const dateRaw = getHeader('Date') || '';

    // Parse sender name & email: e.g. "John Doe <john@doe.com>"
    let sender = fromRaw;
    let senderEmail = fromRaw;
    const match = fromRaw.match(/(.*)<(.*)>/);
    if (match) {
      sender = match[1].replace(/["']/g, '').trim();
      senderEmail = match[2].trim();
    }

    const bodyContent = extractBodyFromPayload(firstMsg.payload) || th.snippet || '';

    // Relative timestamp helper
    const messageDate = dateRaw ? new Date(dateRaw) : new Date();
    const diffHours = Math.round((Date.now() - messageDate.getTime()) / (1000 * 60 * 60));
    const timestampDisplay =
      diffHours < 1
        ? 'Just now'
        : diffHours < 24
        ? `${diffHours}h ago`
        : `${Math.round(diffHours / 24)}d ago`;

    // Calculate layout position on the corkboard for newly synced items
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const posX = 120 + col * 320;
    const posY = 180 + row * 280;
    const rotation = ((idx * 7) % 7) - 3.5;

    parsedThreads.push({
      id: `gmail-${th.id}`,
      provider: 'gmail',
      threadId: th.id,
      subject,
      sender,
      senderEmail,
      snippet: th.snippet || bodyContent.slice(0, 140),
      body: bodyContent,
      timestamp: timestampDisplay,
      unread: th.messages.some((m: any) => m.labelIds?.includes('UNREAD')),
      triaged: false,
      isStarred: th.messages.some((m: any) => m.labelIds?.includes('STARRED')),
      attachmentsCount: th.messages.reduce(
        (acc: number, m: any) =>
          acc + (m.payload?.parts?.filter((p: any) => p.filename && p.filename.length > 0).length || 0),
        0
      ),
      position: {
        x: posX,
        y: posY,
        rotation,
        isPinned: true,
      },
    });
  });

  localStorage.setItem(STORAGE_KEY_LAST_SYNC, new Date().toISOString());

  return {
    threads: parsedThreads,
    mode: isInitialConnect ? 'initial_2days' : 'incremental_1day',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    count: parsedThreads.length,
  };
}
