import { collection, doc, setDoc, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import type { MenuData } from '../types/menu';

const COLLECTION_NAME = 'restaurants';

export interface SubscriptionData {
  plan: '99' | 'custom' | '499';
  startDate: string;
  validTill: string;
  limit: number;
}

export interface SavedMenuRecord {
  id: string;
  slug: string;
  restaurantName: string;
  themeName: string;
  themeId: string;
  status: 'draft' | 'published';
  itemCount: number;
  categoryCount: number;
  lastUpdated: string;
  token?: string;
  menuData: MenuData;
  subscription?: SubscriptionData;
  isActive?: boolean;
}

export function generateToken(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export async function getStoredMenus(): Promise<SavedMenuRecord[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('lastUpdated', 'desc'));
    const snapshot = await getDocs(q);
    const menus: SavedMenuRecord[] = [];
    snapshot.forEach(doc => {
      menus.push(doc.data() as SavedMenuRecord);
    });
    return menus;
  } catch (err) {
    console.error('Failed to get menus from Firestore:', err);
    return [];
  }
}

export async function clearAllStoredMenus(): Promise<SavedMenuRecord[]> {
  // In a production Firestore db, you shouldn't clear all from the client like this,
  // but keeping it here for compatibility with the original App.tsx
  try {
    const menus = await getStoredMenus();
    for (const menu of menus) {
      await deleteDoc(doc(db, COLLECTION_NAME, menu.id));
    }
  } catch (err) {
    console.error('Failed to clear menus:', err);
  }
  return [];
}

export async function saveStoredMenu(
  menuData: MenuData,
  status: 'draft' | 'published' = 'draft',
  subscription?: SubscriptionData,
  isActive?: boolean,
  existingToken?: string
): Promise<SavedMenuRecord> {
  const slug = menuData.slug || menuData.restaurant.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const id = `menu-${slug}`;
  
  const totalItems = menuData.categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const token = existingToken || generateToken();

  const record: SavedMenuRecord = {
    id,
    slug,
    restaurantName: menuData.restaurant.name || 'Untitled Restaurant',
    themeName: menuData.theme.name || 'Custom Theme',
    themeId: menuData.theme.id,
    status,
    itemCount: totalItems,
    categoryCount: menuData.categories.length,
    lastUpdated: new Date().toISOString(),
    token,
    menuData: {
      ...menuData,
      slug,
    },
    ...(subscription ? { subscription } : {}),
    ...(isActive !== undefined ? { isActive } : {}),
  };

  try {
    await setDoc(doc(db, COLLECTION_NAME, id), record, { merge: true });
  } catch (e) {
    console.error('Failed to save menu to Firestore:', e);
  }

  return record;
}

export async function deleteStoredMenu(id: string): Promise<SavedMenuRecord[]> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (e) {
    console.error('Failed to delete menu from Firestore:', e);
  }
  return getStoredMenus();
}

export async function duplicateStoredMenu(id: string): Promise<SavedMenuRecord | null> {
  const existing = await getStoredMenus();
  const target = existing.find(m => m.id === id || m.slug === id);
  if (!target) return null;

  const newSlug = `${target.slug}-copy-${Math.floor(Math.random() * 1000)}`;
  const newName = `${target.restaurantName} (Copy)`;
  
  const duplicatedMenuData: MenuData = {
    ...target.menuData,
    slug: newSlug,
    restaurant: {
      ...target.menuData.restaurant,
      name: newName,
    },
    lastUpdated: new Date().toISOString(),
  };

  return saveStoredMenu(duplicatedMenuData, 'draft', target.subscription, target.isActive);
}

export async function rotateMenuToken(id: string): Promise<string> {
  const existing = await getStoredMenus();
  const target = existing.find(m => m.id === id || m.slug === id);
  if (!target) return generateToken();

  const newToken = generateToken();
  target.token = newToken;
  target.lastUpdated = new Date().toISOString();

  try {
    await setDoc(doc(db, COLLECTION_NAME, target.id), target);
  } catch (e) {
    console.error('Failed to rotate token in Firestore:', e);
  }

  return newToken;
}
