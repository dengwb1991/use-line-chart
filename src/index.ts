import {
  useRef,
  useState,
  useEffect
} from 'react'
import {
  getPixelRatio,
  getExtremeValue,
  getAxisDataSource,
  getCurrPointLocation,
} from './utils'
import {
  RefObject,
  Chart,
  ChartRef,
  DrawOptions,
  InitOptions,
} from './interface'
import {
  CANVAS_STYLE_HUNDRED_PERCENT,
  CANVAS_AUXILIARY_LINE_STROKE_STYLE,
  CANVAS_AUXILIARY_LINE_FILL_STYLE,
  CANVAS_DRAW_STEP,
} from './constants'
import createDraw from './draw'

const useLineChart = (canvasRef: RefObject<any>) => {
  const [pointInterval, setPointInterval] = useState([]) // 节点区间

  const chart: React.MutableRefObject<ChartRef> = useRef({
    initialized: false, // 是否注入
    ctx: null,
    dataIndex: { x: 'x', y: 'y' }, // 渲染数据节点获取的属性值
    dataSource: [], // 数据
    xAxis: { values: [] },
    yAxis: { values: [] },
    padding: '20 20 30 30', // up right down left
  } as any)
  /**
   * 数据X坐标轴转化
   * @param data
   */
  const _x = (data: number) => {
    let { contentWidth, xAxis } = chart.current
    const x = (data - xAxis.min) * contentWidth / xAxis.diff
    return Math.round(x)
  }
  /**
   * 数据Y坐标轴转化
   * @param data
   */
  const _y = (data: number) => {
    let { contentHeight, yAxis } = chart.current
    const y = contentHeight - (data - yAxis.min) * contentHeight / yAxis.diff
    return Math.round(y)
  }
  /**
   * 辅助线
   * @param param
   */
  const _drawAuxiliaryLine = ({ point }: { point: [number, number] }) => {
    const { ctx, contentHeight } = chart.current
    ctx.beginPath()
    ctx.setLineDash([4, 4])
    ctx.moveTo(point[0], 0)
    ctx.lineTo(point[0], contentHeight)
    ctx.lineWidth = 1
    ctx.strokeStyle = CANVAS_AUXILIARY_LINE_STROKE_STYLE
    ctx.stroke()
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.fillStyle = CANVAS_AUXILIARY_LINE_FILL_STYLE
    ctx.arc(...point, 4, 0, Math.PI * 2, true)
    ctx.fill()
  }
  /**
   * 鼠标经过展示节点
   * @param event
   */
  const onMouseMove = (event: any): object | undefined => {
    let { offsetTop, offsetLeft } = event.target
    let { offsetX, offsetY } = event
    offsetX = offsetX ? offsetX : event.clientX
    offsetY = offsetY ? offsetY : event.clientY
    const mouseY = offsetY - offsetTop
    const mouseX = offsetX - offsetLeft
    const { dataSourceAxis, padding, contentHeight, contentWidth } = chart.current
    if (mouseY < padding[0] || mouseY > (contentHeight + +padding[0]) ||
      mouseX < padding[3] || mouseX > (contentWidth + +padding[3])) {
      return void 0
    }
    let index = 0
    let len = pointInterval.length
    const scale = (mouseX - +padding[3]) / dataSourceAxis[len - 1].x
    for (let i = 0; i < len; i++) {
      const intervals = pointInterval[i]
      if (intervals[0] < scale && scale <= intervals[1]) {
        index = i
        break
      } else if (scale >= 1) {
        index = len - 1
      }
    }
    // const len = dataSourceAxis.length - 1
    // const scale = (mouseX - padding[3]) / dataSourceAxis[len].x
    // const index = Math.min(len, Math.max(0, len * scale))
    return initPoint(index)
  }

  /**
   * 初始化获取节点
   * @param index
   */
  const initPoint = (index?: number): object => {
    const { dataSourceAxis, dataSource } = chart.current
    if (index === void 0 || index > dataSource.length - 1) {
      index = dataSource.length - 1
    }
    const point = dataSourceAxis[index]
    draw()
    _drawAuxiliaryLine({ point: [point.x, point.y] })
    return dataSource[index]
  }
  /**
   * 清空画布
   */
  const clearCanvas = () => {
    const { ctx, padding, width, height } : { ctx: any, padding: any, width: number, height: number} = chart.current
    ctx && ctx.clearRect(-padding[1] - padding[3] - 10, -padding[0] - +padding[2] - 10, width + padding[1] + padding[3], height + padding[0] + padding[2])
  }
  /**
   * 画 数据更新
   * @param options 
   */
  const draw = (options: DrawOptions = {
    dataSource: chart.current.dataSource,
    dataIndex: chart.current.dataIndex,
    xAxis: undefined,
    yAxis: undefined,
  }) => {
    let {
      dataSource = chart.current.dataSource,
      dataIndex = chart.current.dataIndex,
      xAxis,
      yAxis,
    } = options
    const { step } : { step: any } = chart.current
    clearCanvas()
    if (xAxis || yAxis) {
      xAxis = xAxis ? xAxis : chart.current.xAxis
      yAxis = yAxis ? yAxis : chart.current.yAxis
      const xAxisValues = getAxisDataSource(xAxis.values)
      const yAxisValues = getAxisDataSource(yAxis.values)
      Object.assign(chart.current, {
        initialized: true,
        xAxis: { ...yAxis, ...xAxisValues },
        yAxis: { ...yAxis, ...yAxisValues },
      })
    }
    const extreme = getExtremeValue(dataSource, dataIndex, _x, _y)
    setPointInterval(getCurrPointLocation(extreme.dataSourceAxis) as any)
    Object.assign(chart.current, extreme)
    const { drawXAxis, drawYAxis, drawLine } = createDraw(chart, _x, _y)
    step[0] && drawXAxis()
    step[1] && drawYAxis()
    step[2] && drawLine()
  }
  /**
   * 初始化方法
   */
  const init = ({
    dataSource = [],
    dataIndex,
    isDraw = true || CANVAS_DRAW_STEP,
    xAxis,
    yAxis,
    padding = chart.current.padding,
    style,
  }: InitOptions): Chart => {
    if (!dataSource) return chartSelf
    const canvas = canvasRef.current
    const { ctx } = chart.current
    const ratio = getPixelRatio(ctx)
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if (typeof padding === 'string') {
      padding = padding.split(/\s+/).map(item => +item)
    }
    const contentWidth = width - padding[1] - padding[3]
    const contentHeight = height - padding[0] - padding[2]
    if (ctx.canvas.style.width === CANVAS_STYLE_HUNDRED_PERCENT) {
      canvas.width = width * ratio
      canvas.height = height * ratio
      ctx.scale(ratio, ratio)
    }
    ctx.translate(padding[3], padding[0])
    const xAxisValues = getAxisDataSource(xAxis.values)
    const yAxisValues = getAxisDataSource(yAxis.values)
    const step = typeof isDraw === 'boolean' ? CANVAS_DRAW_STEP : isDraw
    Object.assign(chart.current, {
      initialized: true,
      dataSource,
      height,
      width,
      contentHeight,
      contentWidth,
      padding,
      xAxis: { ...yAxis, ...xAxisValues },
      yAxis: { ...yAxis, ...yAxisValues },
      step,
      style,
    })
    if (isDraw) {
      draw({
        dataSource,
        dataIndex,
        xAxis: chart.current.xAxis,
        yAxis: chart.current.yAxis,
      } as DrawOptions)
    }
    return chartSelf
  }
  useEffect(() => {
    chart.current.ctx = canvasRef.current.getContext('2d')
  }, [])
  const chartSelf: Chart = {
    chart: chart.current,
    init,
    draw,
    clearCanvas,
    onMouseMove,
    initPoint,
  }
  return chartSelf
}

export default useLineChart