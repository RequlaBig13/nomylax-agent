import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    principle: 'Agent proposes. Nomylax decides. Solana enforces.',
    endpoints: {
      native: {
        method: 'POST', path: '/api/intents', protocol: 'nomylax-intents/1.0',
        response: { intents: [{ amount: 'number', token: 'SOL', recipient: 'Solana public key', purpose: 'string', recipientVerified: 'boolean', contractRisk: '0..100' }] },
      },
      genericProof: {
        method: 'POST', path: '/api/generic-intents', protocol: 'third-party-example/v1',
        note: 'Intentionally returns a non-Nomylax nested JSON shape so Universal Agent Gateway auto-normalization can be demonstrated.',
      },
    },
    authentication: { type: 'bearer', header: 'Authorization' },
    requestContext: { agentId: 'string', count: 'integer 1..25' },
  });
}
