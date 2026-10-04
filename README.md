# Nomylax Reference Agent

A standalone reference implementation of the open Nomylax economic-intent protocol.

This service is **not Nomylax itself** and it does not control user funds.
It exists to prove that an external autonomous agent can propose economic actions
and hand them to Nomylax for policy, risk and Solana enforcement.

## Design principle

**Agent proposes. Nomylax decides. Solana enforces.**

Nomylax is intended to work with any third-party agent that implements the contract below.

## Endpoints

### `GET /api/health`
Health/capability check.

### `GET /api/contract`
Machine-readable integration contract.

### `POST /api/intents`

Header:

```text
Authorization: Bearer <AGENT_API_KEY>
Content-Type: application/json
```

Request:

```json
{
  "agentId": "research-scout",
  "count": 5
}
```

Response:

```json
{
  "protocol": "nomylax-intents/1.0",
  "agent": {
    "id": "research-scout",
    "role": "research",
    "settlementAuthority": false
  },
  "intents": [
    {
      "amount": 0.014,
      "token": "SOL",
      "recipient": "<public Solana address>",
      "purpose": "Purchase a small market-data snapshot",
      "recipientVerified": true,
      "contractRisk": 8
    }
  ]
}
```

## Vercel environment

```text
AGENT_API_KEY=<generate with openssl rand -hex 32>
AGENT_RECIPIENT=<public Devnet wallet address>
ANTHROPIC_API_KEY=<optional>
ANTHROPIC_MODEL=<optional>
```

Anthropic is optional. If it is unavailable, the service returns a deterministic
intent mix so demos remain reliable.

## Universal integration

A third-party does **not** need this repository. They only need to expose the same
authenticated HTTP contract from their own agent infrastructure.

This repository is the public reference implementation.
