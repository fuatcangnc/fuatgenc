import { NextResponse } from 'next/server';
import { uploadFile } from '@/actions/media.actions';
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = await uploadFile(formData);
    return NextResponse.json({ success: true, file });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, message: 'Error uploading file' }, { status: 500 });
  }
}