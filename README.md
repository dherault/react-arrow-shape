# React Arrown Shape

An arrow React component rendered in Canvas

## Installation

```bash
npm install --save react-arrow-shape
```

## Usage

```jsx
import ArrowShape from 'react-arrow-shape'

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Arrow
        fromX={200}
        fromY={200}
        toX={400}
        toY={400}
      />
    </div>
  )
}
```

## Props

| Prop | Type | Description |
| ---- | ---- | ----------- |
| fromX | number | The x coordinate of the starting point of the arrow |
| fromY | number | The y coordinate of the starting point of the arrow |
| toX | number | The x coordinate of the ending point of the arrow |
| toY | number | The y coordinate of the ending point of the arrow |
| curveX | number | The x coordinate of the curve point of the arrow |
| curveY | number | The y coordinate of the curve point of the arrow |
| color | string | The color of the arrow |
| strokeWidth | number | The width of the arrow |
| tipSize | number | The size of the arrow tip |
| tipAngle | number | The angle of the arrow tip |
| tipOffset | number | The offset of the arrow tip |
| cap | 'round' or 'square' or 'butt' | The cap of the arrow |
| padding | number | The padding of the arrow |
| className | string | The class name of the arrow |
| style | React.CSSProperties | The style of the arrow |

## License

MIT

## Contributions

Feel free to create issues and pull requests.
