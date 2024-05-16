import Arrow from 'react-arrow-shape'

function App() {
  return (
    <>
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
        strokeWidth={2}
      />
      <Arrow
        fromX={1000}
        fromY={400}
        toX={1200}
        toY={300}
      />
      <Arrow
        fromX={200}
        fromY={600}
        toX={400}
        toY={650}
        curveX={250}
        curveY={660}
      />
      <Arrow
        fromX={600}
        fromY={600}
        toX={470}
        toY={650}
        curveX={500}
        curveY={644}
        strokeWidth={4}
      />
      <Arrow
        fromX={650}
        fromY={600}
        toX={700}
        toY={650}
        curveX={650}
        curveY={650}
      />
      <Arrow
        fromX={1200}
        fromY={650}
        toX={1000}
        toY={600}
        strokeWidth={3}
        color="orange"
      />
    </>
  )
}

export default App
