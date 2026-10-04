export default function Page() {
  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: '72px 24px 96px' }}>
      <div style={{ fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: '#c6a15b' }}>
        Nomylax open agent contract
      </div>
      <h1 style={{ fontSize: 46, lineHeight: 1.05, margin: '18px 0' }}>
        Reference autonomous agent
      </h1>
      <p style={{ maxWidth: 700, lineHeight: 1.75, color: '#b8b1a7' }}>
        This service proposes economic intents. It cannot move funds and it does not control Nomylax.
        Any third-party agent can integrate with Nomylax by implementing the same authenticated HTTP contract.
      </p>

      <section style={{ marginTop: 34, border: '1px solid #2c2924', padding: 22 }}>
        <div style={{ color: '#d7c39a' }}>POST /api/intents</div>
        <p style={{ color: '#9c958a', lineHeight: 1.6 }}>
          Returns proposed SOL spending intents for Nomylax to evaluate.
        </p>
      </section>

      <section style={{ marginTop: 14, border: '1px solid #2c2924', padding: 22 }}>
        <div style={{ color: '#d7c39a' }}>GET /api/contract</div>
        <p style={{ color: '#9c958a', lineHeight: 1.6 }}>
          Machine-readable description of the open Nomylax agent integration contract.
        </p>
      </section>

      <section style={{ marginTop: 14, border: '1px solid #2c2924', padding: 22 }}>
        <div style={{ color: '#d7c39a' }}>GET /api/health</div>
        <p style={{ color: '#9c958a', lineHeight: 1.6 }}>
          Health and capability check.
        </p>
      </section>
    </main>
  );
}
