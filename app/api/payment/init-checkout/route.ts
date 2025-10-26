import { NextRequest, NextResponse } from 'next/server';

// This endpoint simulates the initialization of a Hosted Checkout session
// In production, this would communicate with Mastercard's API to create a real session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('🔔 Initializing checkout with data:', body);
    // Extract order details
    const { 
      amount, 
      currency = 'USD', 
      orderId, 
      customerEmail,
      customerName,
      description = 'Online Purchase'
    } = body;

    // Basic validation
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // In production, you would make a request to Mastercard's INITIATE CHECKOUT endpoint
    // For demo purposes, we'll create a mock session response
    const mockSessionResponse = {
      session: {
        id: `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
        updateStatus: 'SUCCESS',
        version: '67'
      },
      successIndicator: `${orderId}_success_${Date.now()}`,
      interaction: {
        merchant: {
          name: 'Demo Electronics Store',
          address: {
            line1: '123 Commerce Street',
            line2: 'Suite 100',
            city: 'Demo City',
            stateProvince: 'DC',
            postcodeZip: '12345',
            country: 'USA'
          }
        },
        displayControl: {
          billingAddress: 'MANDATORY',
          customerEmail: 'MANDATORY',
          orderSummary: 'SHOW'
        },
        timeout: 1800, // 30 minutes
        timeoutUrl: `${process.env.NEXTAUTH_URL}/checkout?timeout=true`,
        cancelUrl: `${process.env.NEXTAUTH_URL}/checkout?cancelled=true`,
        returnUrl: `${process.env.NEXTAUTH_URL}/checkout/success?orderId=${orderId}`
      },
      order: {
        id: orderId,
        amount: amount,
        currency: currency,
        description: description,
        item: [
          {
            name: description,
            quantity: 1,
            unitPrice: amount,
            unitTaxAmount: 0
          }
        ]
      },
      customer: {
        email: customerEmail,
        firstName: customerName?.split(' ')[0] || '',
        lastName: customerName?.split(' ').slice(1).join(' ') || ''
      }
    };

    console.log('✅ Mock checkout session created:', mockSessionResponse.session.id);

    return NextResponse.json({
      success: true,
      sessionId: mockSessionResponse.session.id,
      successIndicator: mockSessionResponse.successIndicator,
      data: mockSessionResponse
    });

  } catch (error) {
    console.error('❌ Error initializing checkout:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initialize checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle GET requests to retrieve session status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }

  // In production, you would query Mastercard's API for session status
  // For demo purposes, return a mock status
  const mockSessionStatus = {
    session: {
      id: sessionId,
      version: '67'
    },
    order: {
      status: 'CAPTURED',
      totalAuthorizedAmount: 100.00,
      totalCapturedAmount: 100.00,
      currency: 'USD'
    },
    transaction: [
      {
        id: `txn_${Date.now()}`,
        type: 'PAYMENT',
        frequency: 'SINGLE',
        amount: 100.00,
        currency: 'USD',
        result: 'SUCCESS'
      }
    ]
  };

  return NextResponse.json({
    success: true,
    status: 'COMPLETED',
    data: mockSessionStatus
  });
}