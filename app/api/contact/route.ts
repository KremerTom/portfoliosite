import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
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

    // Log the message (in production, you'd send an email here)
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Add email sending functionality here
    // Options:
    // 1. Use Resend: https://resend.com/docs/send-with-nextjs
    // 2. Use SendGrid: https://www.twilio.com/docs/sendgrid/for-developers/sending-email/quickstart-nodejs
    // 3. Use nodemailer: https://nodemailer.com/
    // 4. Use a service like Web3Forms: https://web3forms.com/

    // For now, we'll just log it and return success
    // Replace this with actual email sending in production

    return NextResponse.json(
      { message: 'Message received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
