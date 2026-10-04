# Nomylax Reference Agent

A standalone test agent for Nomylax. It has no settlement authority and cannot move funds.

**Agent proposes. Nomylax decides. Solana enforces.**

## Why there are two intent endpoints

### `POST /api/intents`
Returns the native Nomylax intent contract.

### `POST /api/generic-intents`
Returns a deliberately different nested JSON shape:

```json
{
  "payload": {
    "actions": [{
      "payment": {
        "value": 0.029,
        "currency": "SOL",
        "destination": "<Solana address>"
      },
      "description": "Cross-check pricing against a second data source",
      "trust": { "recipientVerified": true },
      "risk": { "score": 14 }
    }]
  }
}
```

Nomylax Universal Agent Gateway can auto-normalize this into its canonical economic intent. This proves the product is not hardcoded to the reference agent schema.

## Other endpoints

- `GET /api/health`
- `GET /api/contract`

## Authentication

Both POST endpoints use:

```text
Authorization: Bearer <AGENT_API_KEY>
```

## Vercel environment

```text
AGENT_API_KEY=<generate with openssl rand -hex 32>
AGENT_RECIPIENT=<public Devnet wallet address>
ANTHROPIC_API_KEY=<optional, native endpoint only>
ANTHROPIC_MODEL=<optional, native endpoint only>
```

The native endpoint falls back to deterministic intents if Anthropic is unavailable, keeping the demo reliable.
