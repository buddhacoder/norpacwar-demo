export default function UnderConstruction() {
  return (
    <div style={{ padding: '60px', fontFamily: 'monospace', color: '#444', backgroundColor: '#f9f9f9', minHeight: '100vh', lineHeight: '1.6' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        Database Environment - Under Construction
      </h1>
      <p style={{ maxWidth: '600px', fontSize: '14px' }}>
        The public-facing website is currently offline as we migrate the legacy WordPress database onto the new Sanity CMS architecture.
      </p>
      <p style={{ maxWidth: '600px', fontSize: '14px', marginTop: '20px' }}>
        <strong>Authorized Data Curators:</strong> Please proceed strictly to the <a href="/studio" style={{ color: '#0066cc', textDecoration: 'underline' }}>/studio</a> directory to access the backend media upload tools.
      </p>
    </div>
  );
}
