import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SHAPES = [
  { value: 0.012, description: 'Buy a compact market snapshot', verified: true, score: 7 },
  { value: 0.029, description: 'Cross-check pricing against a second data source', verified: true, score: 14 },
  { value: 0.067, description: 'Acquire a deeper research dataset', verified: true, score: 31 },
  { value: 0.220, description: 'Attempt an unusually expensive premium data purchase', verified: false, score: 82 },
  { value: 0.038, description: 'Run a final validation query before reporting', verified: true, score: 18 },
] as const;

function authorised(req: Request) {
  const expected = process.env.AGENT_API_KEY?.trim();
  return !!expected && req.headers.get('authorization') === `Bearer ${expected}`;
}

function validAddress(value: string) {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);
}

export async function POST(req: Request) {
  if (!authorised(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: any = {};
  try { body = await req.json(); } catch { /* context is optional */ }
  const count = Math.max(1, Math.min(25, Number(body?.count) || 5));
  const recipient = process.env.AGENT_RECIPIENT?.trim() ?? '';
  if (!validAddress(recipient)) {
    return NextResponse.json({ error: 'AGENT_RECIPIENT is not configured' }, { status: 503 });
  }

  // Deliberately NOT the Nomylax native schema. This endpoint proves the
  // Universal Agent Gateway can discover and normalize a third-party shape.
  const actions = Array.from({ length: count }, (_, index) => {
    const sample = SHAPES[index % SHAPES.length];
    return {
      payment: {
        value: sample.value,
        currency: 'SOL',
        destination: recipient,
      },
      description: sample.description,
      trust: { recipientVerified: sample.verified },
      risk: { score: sample.score },
    };
  });

  return NextResponse.json({
    provider: 'research-scout-generic-demo',
    format: 'third-party-example/v1',
    payload: { actions },
  });
}
