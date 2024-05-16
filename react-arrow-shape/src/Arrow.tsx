import { useEffect, useRef } from 'react'

import handleCanvas from './handleCanvas'
import type { ArrowOptions } from './types'

function Arrow(props: ArrowOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    handleCanvas(canvasRef.current, props)
  }, [props])

  return (
    <>
      <canvas
        ref={canvasRef}
        className={props.className}
        style={props.style}
      />
      {/* <div
        style={{
          position: 'absolute',
          top: props.fromY - 4,
          left: props.fromX - 4,
          width: 8,
          height: 8,
          backgroundColor: 'red',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: props.toY - 4,
          left: props.toX - 4,
          width: 8,
          height: 8,
          backgroundColor: 'blue',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: props.curveY ?? 0 - 4,
          left: props.curveX ?? 0 - 4,
          width: 8,
          height: 8,
          backgroundColor: 'green',
          borderRadius: '50%',
        }}
      /> */}
    </>
  )
}

export default Arrow
