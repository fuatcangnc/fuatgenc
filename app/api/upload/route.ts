import { NextResponse } from 'next/server';
import { uploadFile } from '@/actions/media.actions';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = await uploadFile(formData);
    
    if (!file) {
      throw new Error('File upload failed');
    }

    return NextResponse.json({ success: true, file });
  } catch (error) {
    console.error('Error uploading file:', error);
    
    let errorMessage = 'Error uploading file';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}