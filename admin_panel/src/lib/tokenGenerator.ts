export interface SignedTokenRecord {
  menuId: string;
  slug: string;
  token: string;
  createdAt: string;
  expiresAt: string | null;
  isValid: boolean;
}

export function generateSignedToken(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const buffer = new Uint8Array(32);
    window.crypto.getRandomValues(buffer);
    return Array.from(buffer, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return (
    Math.random().toString(36).substring(2) +
    Date.now().toString(36) +
    Math.random().toString(36).substring(2) +
    Math.random().toString(36).substring(2)
  ).substring(0, 64);
}

export function getSignedMenuUrl(slug: string, token: string, baseUrl: string = 'https://bookmydineqr.vercel.app'): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const cleanSlug = slug || 'my-restaurant';
  return `${cleanBase}/m/${cleanSlug}?token=${token}`;
}

export function validateToken(providedToken: string, record: SignedTokenRecord): boolean {
  if (!record || !record.isValid) return false;
  if (record.token !== providedToken) return false;
  if (record.expiresAt && new Date(record.expiresAt).getTime() < Date.now()) return false;
  return true;
}
