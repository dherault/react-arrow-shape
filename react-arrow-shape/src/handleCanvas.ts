import getCanvasDpr from './getCanvasDpr'
import type { ArrowOptions } from './types'

const DEFAULT_PADDING = 16
const DEFAULT_TIP_SIZE = 12
const DEFAULT_TIP_OFFSET = 0
const DEFAULT_STROKE_WIDTH = 1
const DEFAULT_COLOR = 'black'
const DEFAULT_CAP = 'round'
const DEFAULT_TIP_ANGLE = Math.PI / 4 + Math.PI / 2

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
  const tipAngle = options.tipAngle ?? DEFAULT_TIP_ANGLE
  const tipOffset = options.tipOffset ?? DEFAULT_TIP_OFFSET
  const cap = options.cap ?? DEFAULT_CAP
  const offset = padding - strokeWidth / 2
  const hasCurve = typeof options.curveX === 'number' && typeof options.curveY === 'number'
  const curveX = hasCurve ? options.curveX! - minX + offset : 0
  const curveY = hasCurve ? options.curveY! - minY + offset : 0

  const width = maxX - minX + 2 * padding
  const height = maxY - minY + 2 * padding
  const aX = options.fromX - minX + offset
  const aY = options.fromY - minY + offset
  const bX = options.toX - minX + offset
  const bY = options.toY - minY + offset
  // Arrow tip
  const angle = Math.atan2(bY - aY - curveY, bX - aX - curveX)
  const cX = bX + tipSize * Math.cos(angle + tipAngle + tipOffset)
  const cY = bY + tipSize * Math.sin(angle + tipAngle + tipOffset)
  const dX = bX + tipSize * Math.cos(angle - tipAngle + tipOffset)
  const dY = bY + tipSize * Math.sin(angle - tipAngle + tipOffset)

  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.position = 'absolute'
  canvas.style.top = `${minY - padding}px`
  canvas.style.left = `${minX - padding}px`
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  // canvas.style.border = '1px solid lightgrey'

  _.scale(dpr, dpr)

  /* ---
  Draw
  --- */
  _.strokeStyle = options.color ?? DEFAULT_COLOR
  _.lineWidth = strokeWidth
  _.lineCap = cap

  // Arrow body
  _.beginPath()
  _.moveTo(aX, aY)
  if (hasCurve) _.quadraticCurveTo(curveX, curveY, bX, bY)
  else _.lineTo(bX, bY)
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
