import Arrow from 'react-arrow-shape'

function App() {

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Arrow
        fromX={200}
        fromY={200}
        toX={400}
        toY={400}
      />
    </div>
  )
}

export default App
