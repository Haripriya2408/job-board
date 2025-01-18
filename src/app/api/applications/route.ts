// app/api/applications/route.ts
import { NextResponse } from 'next/server';
import { saveApplication } from '@/lib/applicationService';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.jobId || !data.name || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await saveApplication(data);
    
    return NextResponse.json({ 
      success: true,
      data: result
    });
    
  } catch (error: any) {
    console.error('Application submission error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to save application',
        message: error.message 
      },
      { status: 500 }
    );
  }
}