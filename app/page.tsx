export default function Page() {
  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: '72px 24px 96px' }}>
      <div style={{ fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: '#c6a15b' }}>
        Nomylax reference agent
      </div>
      <h1 style={{ fontSize: 46, lineHeight: 1.05, margin: '18px 0' }}>Two API shapes. One control plane.</h1>
      <p style={{ maxWidth: 720, lineHeight: 1.75, color: '#b8b1a7' }}>
        This companion service exists only as a test agent. The native endpoint follows the Nomylax intent contract,
        while the generic endpoint deliberately uses a different nested JSON schema to prove that the Universal Agent Gateway is not hardcoded to one agent format.
      </p>

      <section style={{ marginTop: 34, border: '1px solid #2c2924', padding: 22 }}>
        <div style={{ color: '#d7c39a' }}>POST /api/intents</div>
        <p style={{ color: '#9c958a', lineHeight: 1.6 }}>Native Nomylax economic-intent format.</p>
      </section>
      <section style={{ marginTop: 14, border: '1px solid #2c2924', padding: 22 }}>
        <div style={{ color: '#d7c39a' }}>POST /api/generic-intents</div>
        <p style={{ color: '#9c958a', lineHeight: 1.6 }}>Different nested third-party JSON format for Universal Gateway proof.</p>
      </section>
      <section style={{ marginTop: 14, border: '1px solid #2c2924', padding: 22 }}>
        <div style={{ color: '#d7c39a' }}>GET /api/contract</div>
        <p style={{ color: '#9c958a', lineHeight: 1.6 }}>Machine-readable description of both integration examples.</p>
      </section>
      <section style={{ marginTop: 14, border: '1px solid #2c2924', padding: 22 }}>
        <div style={{ color: '#d7c39a' }}>GET /api/health</div>
        <p style={{ color: '#9c958a', lineHeight: 1.6 }}>Health and capability check.</p>
      </section>
    </main>
  );
}
