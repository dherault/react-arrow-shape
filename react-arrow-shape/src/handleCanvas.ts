import getCanvasDpr from './getCanvasDpr'
import type { ArrowOptions } from './types'

const DEFAULT_PADDING = 16
const DEFAULT_TIP_SIZE = 12
const DEFAULT_STROKE_WIDTH = 1
const DEFAULT_COLOR = 'black'
const ARROW_ANGLE = Math.PI / 4 + Math.PI / 2

function handleCanvas(canvas: HTMLCanvasElement, options: ArrowOptions) {
  const _ = canvas.getContext('2d')!

  const dpr = getCanvasDpr(_)

  const minX = Math.min(options.fromX, options.toX)
  const maxX = Math.max(options.fromX, options.toX)
  const minY = Math.min(options.fromY, options.toY)
  const maxY = Math.max(options.fromY, options.toY)

  const padding = options.padding ?? DEFAULT_PADDING
  const strokeWidth = options.strokeWidth ?? DEFAULT_STROKE_WIDTH
  const tipSize = options.tipSize ?? DEFAULT_TIP_SIZE
  const curveX = typeof options.curveY === 'number' ? options.curveY - minX : 0
  const curveY = typeof options.curveY === 'number' ? options.curveY - minY : 0

  const innerWidth = maxX - minX
  const innerHeight = maxY - minY
  const width = innerWidth + 2 * padding
  const height = innerHeight + 2 * padding
  const aX = options.fromX - minX + padding - strokeWidth / 2
  const aY = options.fromY - minY + padding - strokeWidth / 2
  const bX = options.toX - minX + padding - strokeWidth / 2
  const bY = options.toY - minY + padding - strokeWidth / 2
  // Arrow tip
  const angle = Math.atan2(bY - aY - curveY * innerHeight, bX - aX - curveX * innerWidth)
  const cX = bX + tipSize * Math.cos(angle + ARROW_ANGLE)
  const cY = bY + tipSize * Math.sin(angle + ARROW_ANGLE)
  const dX = bX + tipSize * Math.cos(angle - ARROW_ANGLE)
  const dY = bY + tipSize * Math.sin(angle - ARROW_ANGLE)

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.position = 'absolute'
  canvas.style.top = `${minY - padding}px`
  canvas.style.left = `${minX - padding}px`
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.style.border = '1px solid lightgrey'

  _.scale(dpr, dpr)

  /* ---
    Draw
  --- */
  _.strokeStyle = options.color ?? DEFAULT_COLOR
  _.lineWidth = strokeWidth

  // Arrow body
  _.beginPath()
  _.moveTo(aX, aY)
  _.lineTo(bX, bY)
  _.stroke()
  // Arrow tip
  _.beginPath()
  _.moveTo(bX, bY)
  _.lineTo(cX, cY)
  _.stroke()
  _.beginPath()
  _.moveTo(bX, bY)
  _.lineTo(dX, dY)
  _.stroke()
}

export default handleCanvas
