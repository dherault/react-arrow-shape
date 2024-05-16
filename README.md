# React Arrow Shape

An arrow React component rendered in Canvas.

Will be absolutly positioned. Make sure to place it in a `relative` container.

Can contain a curve point.

## Installation

```bash
npm install --save react-arrow-shape
```

## Usage

```jsx
import Arrow from 'react-arrow-shape'

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
| curveX | number | (optional) The x coordinate of the curve point of the arrow |
| curveY | number | (optional) The y coordinate of the curve point of the arrow |
| color | string | (optional) The color of the arrow |
| strokeWidth | number | (optional) The width of the arrow |
| tipSize | number | (optional) The size of the arrow tip |
| tipAngle | number | (optional) The angle of the arrow tip |
| tipOffset | number | (optional) The offset of the arrow tip |
| cap | 'round' or 'square' or 'butt' | (optional, defaults to 'round') The cap of the arrow |
| padding | number | (optional) The padding of the arrow |
| className | string | (optional) The class name of the arrow |
| style | React.CSSProperties | (optional) The style of the arrow |

## License

MIT

## Contributions

Feel free to create issues and pull requests.
