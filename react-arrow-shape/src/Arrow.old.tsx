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
  padding?: number
}

const MIN_SVG_SIZE = 32

function Arrow({
  fromX,
  fromY,
  toX,
  toY,
  curveX,
  curveY,
  color = 'black',
  strokeWidth = 0.01,
  tipSize = 0.1,
  padding = 0,
}: ArrowProps) {
  const {
    topLeft,
    bottomRight,
    aX,
    aY,
    bX,
    bY,
    cX,
    cY,
    dX,
    dY,
  } = useMemo(() => {
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

    const diffX = Math.max(maxX - minX, width)
    const diffY = Math.max(maxY - minY, height)

    // Arrow body
    const aX = (fromX - minX) / diffX
    const aY = (fromY - minY) / diffY
    const bX = (toX - minX) / diffX
    const bY = (toY - minY) / diffY
    // Arrow tip
    const angle = Math.atan2(bY - (curveY ?? 0) * height, bX - (curveX ?? 0) * width)
    const cX = bX + tipSize * Math.cos(angle + Math.PI / 4 + Math.PI / 2)
    const cY = bY + tipSize * Math.sin(angle + Math.PI / 4 + Math.PI / 2)
    const dX = bX + tipSize * Math.cos(angle - Math.PI / 4 - Math.PI / 2)
    const dY = bY + tipSize * Math.sin(angle - Math.PI / 4 - Math.PI / 2)

    return {
      topLeft: {
        x: minX - paddingLeft,
        y: minY - paddingTop,
      },
      bottomRight: {
        x: Math.max(maxX, minX + width - paddingLeft),
        y: Math.max(maxY, minY + height - paddingTop),
      },
      aX,
      aY,
      bX,
      bY,
      cX,
      cY,
      dX,
      dY,
    }
  }, [
    fromX,
    fromY,
    toX,
    toY,
    curveX,
    curveY,
    tipSize,
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
        viewBox={`${-padding} ${-padding} ${1 + 2 * padding} ${1 + 2 * padding}`}
        style={{
          position: 'absolute',
          top: topLeft.y,
          left: topLeft.x,
          width: bottomRight.x - topLeft.x,
          height: bottomRight.y - topLeft.y,
          border: '1px solid lightgrey',
        }}
      >
        <path
          d={typeof curveX !== 'undefined' && typeof curveY !== 'undefined'
            ? `M ${aX} ${aY} Q ${curveX} ${curveY}, ${bX} ${bY}`
            : `M ${aX} ${aY} L ${bX} ${bY}`}
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
        {typeof curveX !== 'undefined' && typeof curveY !== 'undefined' && (
          <circle
            cx={curveX}
            cy={curveY}
            r={0.025}
            fill="orange"
          />
        )}
        <circle
          cx={aX}
          cy={aY}
          r={0.025}
          fill="red"
        />
        <circle
          cx={bX}
          cy={bY}
          r={0.025}
          fill="blue"
        />
        <circle
          cx={cX}
          cy={cY}
          r={0.025}
          fill="green"
        />
        <circle
          cx={dX}
          cy={dY}
          r={0.025}
          fill="green"
        />
      </svg>
    </>
  )
}

export default Arrow