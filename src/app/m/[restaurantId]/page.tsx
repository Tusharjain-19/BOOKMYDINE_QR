import React from 'react';
import { notFound } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import MenuViewer from '../../../components/menu/MenuViewer';
import ExpiredMenu from '../../../components/menu/ExpiredMenu';
import { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata({ params }: { params: Promise<{ restaurantId: string }> }): Promise<Metadata> {
  const { restaurantId } = await params;
  try {
    const docRef = doc(db, 'restaurants', `menu-${restaurantId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        title: `${data.restaurantName} - Menu`,
        description: data.menuData?.restaurant?.tagline || `Digital Menu for ${data.restaurantName}`,
      };
    }
  } catch (e) {
    console.error(e);
  }
  return {
    title: 'Menu Not Found',
  };
}

export default async function RestaurantMenuPage({ params }: { params: Promise<{ restaurantId: string }> }) {
  const { restaurantId } = await params;
  
    let data: any = null;

    try {
      const docRef = doc(db, 'restaurants', `menu-${restaurantId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        data = docSnap.data();
      }
    } catch (e) {
      console.warn('Firestore fetch failed, falling back to local data if applicable.');
    }

    // Fallback for live URL if Firestore isn't setup
    if (!data && restaurantId === 'r_9GF51EmhRp3W') {
      try {
        const omSweetsData = await import('../../../data/omSweetsData.json');
        data = {
          restaurantName: omSweetsData.restaurant.name,
          isActive: true,
          menuData: omSweetsData,
        };
      } catch (err) {
        console.error('Failed to load fallback JSON', err);
      }
    }

    if (!data) {
      notFound();
    }

    // Check validity
    const isActive = data.isActive !== false;
    let isExpired = false;

    if (data.subscription?.validTill) {
      const validTillDate = new Date(data.subscription.validTill);
      if (new Date() > validTillDate) {
        isExpired = true;
      }
    }

    if (!isActive || isExpired) {
      return <ExpiredMenu restaurantName={data.restaurantName || 'Restaurant'} />;
    }

    // Render Menu
    return <MenuViewer menuData={data.menuData} />;
}
