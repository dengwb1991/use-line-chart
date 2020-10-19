import {
  getSplineCurve,
  getLineCoefficient,
} from './utils'
import {
  LineOptions,
  AxisOptions,
  LabelValue,
} from './interface'
import {
  CANVAS_LINE_STROKE_STYLE,
  CANVAS_LINE_WIDTH,
  CANVAS_LINE_TYPE,
  CANVAS_FILL_VISIBLE,
  CANVAS_FILL_STYLE,
  CANVAS_FILL_STROKE_STYLE,
  CANVAS_AXIS_FONT,
  CANVAS_AXIS_TEXT_BASE_LINE,
  CANVAS_AXIS_FILL_STYLE,
  CANVAS_AXIS_LINE_WIDTH,
  CANVAS_AXIS_STROKE_STYLE,
} from './constants'

/**
 * 设置轴属性
 */
const _setCxtAxis = (ctx: any, options: AxisOptions, style: AxisOptions) => {
  const {
    font = style.font || CANVAS_AXIS_FONT,
    textBaseline = style.textBaseline || CANVAS_AXIS_TEXT_BASE_LINE,
    fillStyle = style.fillStyle || CANVAS_AXIS_FILL_STYLE,
    lineWidth = style.lineWidth || CANVAS_AXIS_LINE_WIDTH,
    strokeStyle = style.strokeStyle || CANVAS_AXIS_STROKE_STYLE,
  } = options
  ctx.font = font
  ctx.textBaseline = textBaseline
  ctx.fillStyle = fillStyle
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = strokeStyle
}
/**
 * 获取贝塞尔控制点
 * @param dataSource
 */
const _getPonits = (dataSourceAxis: any[], t: number, contentHeight: number) => {
  let arr = []
  let prev = dataSourceAxis[0]
  for (let i = 0, len = dataSourceAxis.length; i < len; i++) {
    let curr = dataSourceAxis[i]
    let controlPoints = getSplineCurve(prev, curr, dataSourceAxis[Math.min(i + 1, len - 1) % len], t, contentHeight)
    arr.push({
      ...curr,
      ...controlPoints
    })
    prev = curr
  }
  return arr
}
/**
 * 创建画
 * @param chart 
 * @param _x 
 * @param _y 
 */
const createDraw = (chart: React.MutableRefObject<any>, _x: Function, _y: Function) => {
  const {
    ctx,
    contentHeight,
    contentWidth,
    xAxis,
    yAxis,
    padding,
    style = {}
  } = chart.current
  const {
    line = {},
    fill = {},
    xAxis: styleX = {},
    yAxis: styleY = {},
    auxiliaryLine = {}
  } = style
  /**
   * 初始化 X 轴线
   */
  const drawXAxis = (options: AxisOptions = {}) => {
    const { values } = xAxis
    ctx.beginPath()
    _setCxtAxis(ctx, options, styleX)
    for (let i = 0, len = values.length; i < len; i++) {
      const val = values[i]
      const x = _x(val.value)
      if (i === 0) {
        ctx.textAlign = 'left'
      } else if (i === values.length - 1) {
        ctx.textAlign = 'right'
      } else {
        ctx.textAlign = 'center'
      }
      ctx.fillText(val.label, x, contentHeight + padding[2] / 2)
      ctx.moveTo(x, contentHeight)
      ctx.lineTo(x, contentHeight + 4)
    }
    ctx.stroke()
  }
  /**
   * 初始化 Y 轴线
   */
  const drawYAxis = (options: AxisOptions = {}) => {
    const { values } = yAxis
    ctx.beginPath()
    _setCxtAxis(ctx, options, styleY)
    values.forEach((val: LabelValue<string, number>) => {
      const y = _y(val.value)
      ctx.textAlign = 'left'
      ctx.fillText(val.label, -padding[3], y)
      ctx.moveTo(0, y)
      ctx.lineTo(contentWidth, y)
    })
    ctx.stroke()
  }
  /**
   * 画线
   */
  const drawLine = (options: LineOptions = {}) => {
    const {
      lineType = line.lineType || CANVAS_LINE_TYPE,
      lineWidth = line.width || CANVAS_LINE_WIDTH,
      strokeStyle = line.strokeStyle || CANVAS_LINE_STROKE_STYLE,
      lineFill = fill.visible === false ? false : CANVAS_FILL_VISIBLE,
    } = options
    const { ctx, dataSourceAxis, contentHeight } = chart.current
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeStyle
    if (!dataSourceAxis || !dataSourceAxis.length) return
    const newDataSource = _getPonits(dataSourceAxis, getLineCoefficient(lineType), contentHeight)
    let firstX = 0
    let lastX = 0
    for (let i = 0, len = dataSourceAxis.length; i < len; i++) {
      let curr = newDataSource[i]
      if (i === 0) {
        ctx.moveTo(curr.x, curr.y)
        firstX = curr.x
        continue
      }
      const next = newDataSource[i === 0 ? 0 : i - 1].next
      const prev = curr.previous
      ctx.bezierCurveTo(next.x, next.y, prev.x, prev.y, curr.x, curr.y)
      
      lastX = curr.x
    }
    ctx.stroke()

    if (lineFill) {
      ctx.fillStyle = fill.style || CANVAS_FILL_STYLE
      ctx.strokeStyle = CANVAS_FILL_STROKE_STYLE
      ctx.lineTo(lastX, contentHeight)
      ctx.lineTo(firstX, contentHeight)
      ctx.stroke()
      ctx.fill()
    }
  }
  return {
    drawXAxis,
    drawYAxis,
    drawLine
  }
}

export default createDraw