import { NextRequest, NextResponse } from 'next/server';
import { headerSchema,topBarSchema } from '@/schemas/headerSchema';
import { db } from '@/lib/db'; // Veritabanı örneği
import { topBar,header } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
    try {
      const data = headerSchema.parse(await req.json());
      // Drizzle ORM ile veritabanına kaydet
      await db.insert(header).values(data);
      return NextResponse.json({ message: 'Header saved successfully' });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  export async function GET() {
    try {
      const data = await db.select().from(header).limit(1);
      if (data.length === 0) {
        return NextResponse.json({ error: 'No header data found' }, { status: 404 });
      }
      const headerData = headerSchema.parse(data[0]);
      return NextResponse.json({ header: headerData });
    } catch (error) {
      console.error('Error in GET function:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

  export async function PUT(request: NextRequest) {
    try {
      const body = await request.json();
      const validatedData = headerSchema.parse(body);
  
      // Mevcut header verisini al
      const existingHeader = await db.select().from(header).limit(1);
  
      if (existingHeader.length === 0) {
        // Header yoksa yeni bir tane oluştur
        const newHeader = await db.insert(header).values(validatedData).returning();
        return NextResponse.json({ message: 'Header successfully created', header: newHeader[0] });
      } else {
        // Header varsa güncelle
        const updatedHeader = await db.update(header)
          .set(validatedData)
          .where(eq(header.id, existingHeader[0].id))
          .returning();
  
        return NextResponse.json({ message: 'Header successfully updated', header: updatedHeader[0] });
      }
    } catch (error) {
      console.error('Error updating header:', error);
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ error: 'An error occurred while updating the header' }, { status: 400 });
    }
  }