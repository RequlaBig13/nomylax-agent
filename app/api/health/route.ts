import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'nomylax-reference-agent',
    protocol: 'nomylax-intents/1.0',
    role: 'economic-intent-proposer',
    settlementAuthority: false,
    custody: false,
  });
}
