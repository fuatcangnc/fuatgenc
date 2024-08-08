'use server'

import { db } from '@/lib/schema';
import { header } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { HeaderData } from '@/schemas/headerSchema';

export async function getHeaderData(): Promise<HeaderData | null> {
  try {
    const headerData = await db.select().from(header).where(eq(header.id, 1)).limit(1);
    
    if (headerData.length === 0) {
      return null;
    }

    const result = headerData[0];
    return {
      image: result.image,
      menus: result.menus as HeaderData['menus'],
      menuOrder: result.menuOrder as HeaderData['menuOrder'],
    };
  } catch (error) {
    console.error('Error fetching header data:', error);
    throw new Error('Failed to fetch header data');
  }}