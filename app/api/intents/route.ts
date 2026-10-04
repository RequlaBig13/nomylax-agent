import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Intent = {
  amount: number;
  token: 'SOL';
  recipient: string;
  purpose: string;
  recipientVerified: boolean;
  contractRisk: number;
};

const FALLBACK = [
  { amount: 0.014, purpose: 'Purchase a small market-data snapshot', recipientVerified: true, contractRisk: 8 },
  { amount: 0.027, purpose: 'Cross-check market signals with a second data source', recipientVerified: true, contractRisk: 12 },
  { amount: 0.061, purpose: 'Acquire a deeper dataset for research validation', recipientVerified: true, contractRisk: 26 },
  { amount: 0.210, purpose: 'Attempt a premium data purchase outside the normal research budget', recipientVerified: false, contractRisk: 76 },
  { amount: 0.036, purpose: 'Run a final verification query before producing the report', recipientVerified: true, contractRisk: 15 },
] as const;

function isAuthorised(req: Request) {
  const expected = process.env.AGENT_API_KEY?.trim();
  return !!expected && req.headers.get('authorization') === `Bearer ${expected}`;
}

function validSolanaAddress(value: string) {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);
}

async function claudeIntents(count: number, recipient: string, agentId: string): Promise<Intent[] | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  const model = process.env.ANTHROPIC_MODEL?.trim();
  if (!apiKey || !model) return null;

  const prompt = `You are an autonomous research agent identified as ${agentId}.
Propose exactly ${count} economic intents for a Solana financial-control demo.
You have NO settlement authority. Nomylax decides whether requests are allowed.
Return ONLY a JSON array. Each item must contain:
amount (0.01 to 0.30), token ("SOL"), purpose, recipientVerified (boolean), contractRisk (0 to 100).
Most intents should be ordinary; at least one should intentionally look risky or over-budget.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: 1200,
        temperature: 0.35,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;

    const body = await res.json() as any;
    const text = Array.isArray(body?.content)
      ? body.content.find((part: any) => part?.type === 'text')?.text
      : null;
    if (typeof text !== 'string') return null;

    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return null;
    const parsed = JSON.parse(match[0]);
    if (!Array.isArray(parsed)) return null;

    const intents = parsed.slice(0, count).map((item: any): Intent => ({
      amount: Math.max(0.01, Math.min(0.30, Number(item.amount) || 0.02)),
      token: 'SOL',
      recipient,
      purpose: String(item.purpose || 'Autonomous research purchase').slice(0, 140),
      recipientVerified: Boolean(item.recipientVerified),
      contractRisk: Math.max(0, Math.min(100, Math.round(Number(item.contractRisk) || 0))),
    }));
    return intents.length ? intents : null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Body must be JSON' }, { status: 400 });
  }

  const agentId = typeof body?.agentId === 'string' ? body.agentId.slice(0, 64) : 'reference-agent';
  const count = Math.max(1, Math.min(25, Number(body?.count) || 5));

  const recipient = process.env.AGENT_RECIPIENT?.trim() ?? '';
  if (!validSolanaAddress(recipient)) {
    return NextResponse.json(
      { error: 'AGENT_RECIPIENT must be configured with a valid public Devnet Solana address' },
      { status: 503 },
    );
  }

  const generated = await claudeIntents(count, recipient, agentId);

  const deterministic: Intent[] = Array.from({ length: count }, (_, index) => {
    const item = FALLBACK[index % FALLBACK.length];
    return {
      amount: item.amount,
      token: 'SOL',
      recipient,
      purpose: item.purpose,
      recipientVerified: item.recipientVerified,
      contractRisk: item.contractRisk,
    };
  });

  return NextResponse.json({
    protocol: 'nomylax-intents/1.0',
    agent: {
      id: agentId,
      role: 'research',
      settlementAuthority: false,
      generatedBy: generated ? 'anthropic' : 'deterministic-fallback',
    },
    intents: generated ?? deterministic,
  });
}
