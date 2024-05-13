import { useMemo } from 'react'

type ArrowProps = {
  fromX: number
  fromY: number
  toX: number
  toY: number
  curveX?: number
  curveY?: number
  color?: string
}

const MIN_SVG_SIZE = 32
const SVG_PADDING = 0
const ARROW_TIP_LENGTH = 12

function Arrow({
  fromX,
  fromY,
  toX,
  toY,
  curveX = 0.5,
  curveY = 0.5,
  color = 'black',
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
    const cX = bX + ARROW_TIP_LENGTH * Math.cos(angle + Math.PI / 4 + Math.PI / 2)
    const cY = bY + ARROW_TIP_LENGTH * Math.sin(angle + Math.PI / 4 + Math.PI / 2)
    const dX = bX + ARROW_TIP_LENGTH * Math.cos(angle - Math.PI / 4 - Math.PI / 2)
    const dY = bY + ARROW_TIP_LENGTH * Math.sin(angle - Math.PI / 4 - Math.PI / 2)

    return {
      cX,
      cY,
      dX,
      dY,
    }
  }, [
    curveX,
    curveY,
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
          top: fromY - 2,
          left: fromX - 2,
          width: 4,
          height: 4,
          backgroundColor: 'red',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: toY - 2,
          left: toX - 2,
          width: 4,
          height: 4,
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
          strokeWidth={2}
        />
        <path
          d={`M ${cX} ${cY} L ${bX} ${bY} L ${dX} ${dY}`}
          fill="none"
          stroke={color}
          strokeWidth={2}
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
          r={5}
          fill="red"
        />
        <circle
          cx={bX}
          cy={bY}
          r={2}
          fill="blue"
        />
        <circle
          cx={cX}
          cy={cY}
          r={2}
          fill="green"
        />
        <circle
          cx={dX}
          cy={dY}
          r={2}
          fill="green"
        />
      </svg>
    </>
  )
}

export default Arrow
