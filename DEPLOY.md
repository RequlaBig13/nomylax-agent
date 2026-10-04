# Deploy the Nomylax Reference Agent

## 1. Create GitHub repository

Create an empty public repository:

`nomylax-agent`

Do not initialize it with another README.

## 2. Put this folder at the repository root

Expected files:

- app/
- package.json
- tsconfig.json
- next-env.d.ts
- .env.example
- .gitignore
- README.md
- DEPLOY.md

## 3. Push

```bash
git init
git branch -M main
git add .
git commit -m "feat: launch Nomylax reference agent"
git remote add origin https://github.com/YOUR_USERNAME/nomylax-agent.git
git push -u origin main
```

## 4. Import into Vercel

Vercel -> Add New -> Project -> `nomylax-agent`

Framework: Next.js
Root directory: `./`

## 5. Environment variables

Generate a shared secret:

```bash
openssl rand -hex 32
```

Set:

```text
AGENT_API_KEY=<generated secret>
AGENT_RECIPIENT=<public Devnet Solana wallet address>
ANTHROPIC_API_KEY=<optional>
ANTHROPIC_MODEL=<optional>
```

Deploy.

## 6. Verify

Open:

`https://YOUR-DOMAIN.vercel.app/api/health`

and:

`https://YOUR-DOMAIN.vercel.app/api/contract`

Your authenticated intent endpoint is:

`https://YOUR-DOMAIN.vercel.app/api/intents`

Do not expose `AGENT_API_KEY` in a browser or public README.
