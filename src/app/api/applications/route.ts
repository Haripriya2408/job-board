// Only import what you use
import { NextRequest } from 'next/server';
import { saveApplication } from '@/lib/applicationService';

export async function POST(request: NextRequest) {
  try {
    const application = await request.json();
    await saveApplication(application);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to save application' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}