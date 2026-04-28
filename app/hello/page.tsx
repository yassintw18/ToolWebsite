export default function HelloPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Hello World</h1>
      <p>This is a simple test page.</p>
      <p>Time: {new Date().toLocaleString()}</p>
    </div>
  )
}
