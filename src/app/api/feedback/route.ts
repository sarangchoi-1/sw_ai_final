import { NextRequest, NextResponse } from 'next/server';

const GAS_FEEDBACK_URL = process.env.GAS_FEEDBACK_URL;

export async function POST(request: NextRequest) {
  try {
    const { email, feedback } = await request.json();

    if (!email || !feedback) {
      return NextResponse.json(
        { error: 'Email and feedback are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!GAS_FEEDBACK_URL) {
      console.error('Missing GAS_FEEDBACK_URL environment variable');
      return NextResponse.json(
        { error: 'Feedback service is not configured' },
        { status: 500 }
      );
    }

    const res = await fetch(GAS_FEEDBACK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, feedback }),
      redirect: 'follow',
    });

    // GAS often returns 302 to a Googleusercontent URL; consider 2xx and 3xx as acceptable
    const acceptable = res.ok || (res.status >= 300 && res.status < 400);
    const text = await res.text();

    // Try JSON first
    let body: unknown = {};
    try {
      body = JSON.parse(text);
    } catch {
      body = {};
    }

    const isSuccessObject =
      typeof body === 'object' &&
      body !== null &&
      'status' in body &&
      (body as { status: unknown }).status === 'success';

    if (acceptable || isSuccessObject) {
      return NextResponse.json({
        success: true,
        message: 'Feedback received successfully',
      });
    }

    console.error('GAS feedback error:', res.status, text);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 502 }
    );
  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
}

