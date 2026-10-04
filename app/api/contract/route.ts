import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    protocol: 'nomylax-intents/1.0',
    authentication: {
      type: 'bearer',
      header: 'Authorization',
    },
    request: {
      method: 'POST',
      path: '/api/intents',
      body: {
        agentId: 'string',
        count: 'integer 1..25',
      },
    },
    response: {
      intents: [{
        amount: 'number, SOL',
        token: 'SOL',
        recipient: 'Solana public key',
        purpose: 'string',
        recipientVerified: 'boolean',
        contractRisk: 'integer 0..100',
      }],
    },
    principle: 'Agent proposes. Nomylax decides. Solana enforces.',
  });
}
