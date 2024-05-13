import { useMemo } from 'react'

type ArrowProps = {
  fromX: number
  fromY: number
  toX: number
  toY: number
  curveX?: number
  curveY?: number
  color?: string
  strokeWidth?: number | string
  tipSize?: number
}

const MIN_SVG_SIZE = 32
const SVG_PADDING = 0

function Arrow({
  fromX,
  fromY,
  toX,
  toY,
  curveX = 0.5,
  curveY = 0.5,
  color = 'black',
  strokeWidth = 1,
  tipSize = 12,
}: ArrowProps) {
  const { width, height, paddingTop, paddingLeft, topLeft, bottomRight } = useMemo(() => {
    const minX = Math.min(fromX, toX)
    const minY = Math.min(fromY, toY)
    const maxX = Math.max(fromX, toX)
    const maxY = Math.max(fromY, toY)
    let width = Math.abs(toX - fromX)
    let height = Math.abs(toY - fromY)
    let paddingTop = 0
    let paddingLeft = 0

    if (width < MIN_SVG_SIZE) {
      width = MIN_SVG_SIZE
      paddingLeft = MIN_SVG_SIZE / 2
    }
    if (height < MIN_SVG_SIZE) {
      height = MIN_SVG_SIZE
      paddingTop = MIN_SVG_SIZE / 2
    }

    return {
      width,
      height,
      paddingTop,
      paddingLeft,
      topLeft: {
        x: minX - paddingLeft,
        y: minY - paddingTop,
      },
      bottomRight: {
        x: Math.max(maxX, minX + width - paddingLeft),
        y: Math.max(maxY, minY + height - paddingTop),
      },
    }
  }, [
    fromX,
    fromY,
    toX,
    toY,
  ])

  // Arrow body
  const { aX, aY, bX, bY } = useMemo(() => {
    const aX = fromX - paddingLeft
    const aY = fromY - paddingTop
    const bX = toX - paddingLeft
    const bY = toY - paddingTop

    return {
      aX,
      aY,
      bX,
      bY,
    }
  }, [
    fromX,
    fromY,
    toX,
    toY,
    paddingTop,
    paddingLeft,
  ])

  // Arrow tip
  const { cX, cY, dX, dY } = useMemo(() => {
    const angle = Math.atan2(bY - curveY * height, bX - curveX * width)
    const cX = bX + tipSize * Math.cos(angle + Math.PI / 4 + Math.PI / 2)
    const cY = bY + tipSize * Math.sin(angle + Math.PI / 4 + Math.PI / 2)
    const dX = bX + tipSize * Math.cos(angle - Math.PI / 4 - Math.PI / 2)
    const dY = bY + tipSize * Math.sin(angle - Math.PI / 4 - Math.PI / 2)

    return {
      cX,
      cY,
      dX,
      dY,
    }
  }, [
    curveX,
    curveY,
    tipSize,
    width,
    height,
    bX,
    bY,
  ])

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: fromY - 4,
          left: fromX - 4,
          width: 8,
          height: 8,
          backgroundColor: 'red',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: toY - 4,
          left: toX - 4,
          width: 8,
          height: 8,
          backgroundColor: 'blue',
          borderRadius: '50%',
        }}
      />
      <svg
        viewBox={`${topLeft.x - SVG_PADDING} ${topLeft.y - SVG_PADDING} ${bottomRight.x + 2 * SVG_PADDING} ${bottomRight.y + 2 * SVG_PADDING}`}
        style={{
          position: 'absolute',
          top: topLeft.y,
          left: topLeft.x,
          width: bottomRight.x - topLeft.x,
          height: bottomRight.y - topLeft.y,
          border: '1px solid black',
        }}
      >
        <path
          d={`M ${aX} ${aY} Q ${curveX * (bottomRight.x - topLeft.x) + topLeft.x} ${curveY * (bottomRight.y - topLeft.y) + topLeft.y}, ${bX} ${bY}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <path
          d={`M ${cX} ${cY} L ${bX} ${bY} L ${dX} ${dY}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={curveX * (bottomRight.x - topLeft.x) + topLeft.x}
          cy={curveY * (bottomRight.y - topLeft.y) + topLeft.y}
          r={2}
          fill="orange"
        />
        <circle
          cx={aX}
          cy={aY}
          r={10}
          fill="red"
        />
        <circle
          cx={bX}
          cy={bY}
          r={10}
          fill="blue"
        />
        <circle
          cx={cX}
          cy={cY}
          r={10}
          fill="green"
        />
        <circle
          cx={dX}
          cy={dY}
          r={10}
          fill="green"
        />
      </svg>
    </>
  )
}

export default Arrow
