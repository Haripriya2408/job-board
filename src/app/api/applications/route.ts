// app/api/applications/route.ts
import { NextResponse } from 'next/server';
import { saveApplication } from '@/lib/applicationService';

interface ApplicationRequest {
  jobId: string;
  name: string;
  email: string;
  phone?: string;
  experience: string;
  resumeName?: string;
  resumeData?: string | null;
}

export async function POST(req: Request) {
  try {
    const data: ApplicationRequest = await req.json();
    // Your existing logic here
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}