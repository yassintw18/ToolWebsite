export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Test Page - If you see this, routing works!</h1>
      <p>Current time: {new Date().toLocaleString()}</p>
      <p>This is a simple test page to verify basic routing is working.</p>
    </div>
  )
}
