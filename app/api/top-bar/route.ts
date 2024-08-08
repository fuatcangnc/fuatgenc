import { NextRequest, NextResponse } from 'next/server';
import { headerSchema,topBarSchema } from '@/schemas/headerSchema';
import { db } from '@/lib/db'; // Veritabanı örneği
import { topBar,header } from '@/lib/schema';

export async function POST(req: NextRequest) {
    try {
      const data = topBarSchema.parse(await req.json());
      // Drizzle ORM ile veritabanına kaydet
      await db.insert(topBar).values(data);
      return NextResponse.json({ message: 'Top Bar saved successfully' });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }