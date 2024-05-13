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
      <Arrow
        fromX={500}
        fromY={200}
        toX={500}
        toY={450}
      />
      <Arrow
        fromX={700}
        fromY={400}
        toX={800}
        toY={400}
      />
    </div>
  )
}

export default App
