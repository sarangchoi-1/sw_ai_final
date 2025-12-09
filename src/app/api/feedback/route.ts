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
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('GAS feedback error:', res.status, text);
      return NextResponse.json(
        { error: 'Failed to submit feedback' },
        { status: 502 }
      );
    }

    const body = await res.json().catch(() => ({}));
    if (body && body.status === 'success') {
      return NextResponse.json({
        success: true,
        message: 'Feedback received successfully',
      });
    }

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

