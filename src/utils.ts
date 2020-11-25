import {
  Point,
  DataIndex,
  LineType,
  LabelValue
} from './interface'
import {
  CANVAS_LINE_POLYLINE_COEFFICIENT,
  CANVAS_LINE_CURVE_COEFFICIENT,
} from './constants'
/**
 * 获取设备像素比
 * @param {Object} context canvas上下文对象
 */
export const getPixelRatio = (context: any) => {
  const backingStore = context.backingStorePixelRatio
    || context.webkitBackingStorePixelRatio
    || context.mozBackingStorePixelRatio
    || context.msBackingStorePixelRatio
    || context.oBackingStorePixelRatio
    || context.backingStorePixelRatio || 1
  return (window.devicePixelRatio || 1) / backingStore
}
/**
 * 曲线
 * @param firstPoint
 * @param middlePoint
 * @param afterPoint
 * @param t
 */
export const getSplineCurve = (firstPoint: Point, middlePoint: Point, afterPoint: Point, t: number, maxHeight: number) => {
  let previous = firstPoint
  let current = middlePoint
  let next = afterPoint
  let d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2))
  let d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2))
  let s01 = d01 / (d01 + d12)
  let s12 = d12 / (d01 + d12)
  s01 = isNaN(s01) ? 0 : s01
  s12 = isNaN(s12) ? 0 : s12
  let fa = t * s01
  let fb = t * s12
  return {
    previous: {
      x: current.x - fa * (next.x - previous.x),
      y: current.y - fa * (next.y - previous.y) > maxHeight ? maxHeight : current.y - fa * (next.y - previous.y)
    },
    next: {
      x: current.x + fb * (next.x - previous.x),
      y: current.y + fb * (next.y - previous.y) > maxHeight ? maxHeight : current.y + fb * (next.y - previous.y)
    }
  }
}
/**
 * 求最大值、最小值、极值
 * @param {Array, Object} data
 */
/**
 * 获取数据源、数据源坐标、最小值、最大值、极值
 * @param data dataSource 数据源
 * @param dataIndex 数据源key
 * @param _x x轴坐标转化方法
 * @param _y y轴坐标转化方法
 * @return
 */
export const getExtremeValue = (data: any[], dataIndex: DataIndex, _x: Function, _y: Function) => {
  const xArray: any[] = []
  const yArray: any[] = []
  const dataSource: any[] = []
  const dataSourceAxis: any[] = []
  data.forEach(cur => {
    let point: Point = { x: 0, y: 0 }
    if (Array.isArray(cur)) {
      point.x = cur[0]
      point.y = cur[1]
    } else {
      point.x = cur[dataIndex.x]
      point.y = cur[dataIndex.y]
    }
    xArray.push(point.x)
    yArray.push(point.y)
    dataSource.push(point)
    dataSourceAxis.push({
      x: _x(point.x),
      y: _y(point.y)
    })
  })
  return {
    dataSource,
    dataSourceAxis: dataSourceAxis.length ? (dataSourceAxis as Point[]).sort((prev, curr) => +prev.x - +curr.x) : [],
    min: [Math.min(...xArray), Math.min(...yArray)],
    max: [Math.max(...xArray), Math.max(...yArray)],
    diff: [Math.max(...xArray) - Math.min(...xArray), Math.max(...yArray) - Math.min(...yArray)]
  }
}
/**
 * 获取节点区间
 * @param dataSourceAxis
 */
export const getCurrPointLocation = (dataSourceAxis: Point[]) => {
  if (!dataSourceAxis.length) return []
  let arr = []
  const len = dataSourceAxis.length
  const total = dataSourceAxis[len - 1].x
  for (let i = 0, len = dataSourceAxis.length; i < len; i++) {
    let item = []
    if (i === 0) {
      item.push(0)
      item.push((dataSourceAxis[i].x + dataSourceAxis[i + 1].x) / 2 / total)
    } else if (i === len - 1) {
      item.push((dataSourceAxis[i].x + dataSourceAxis[i - 1].x) / 2 / total)
      item.push(1)
    } else {
      item.push((dataSourceAxis[i].x + dataSourceAxis[i - 1].x) / 2 / total)
      item.push((dataSourceAxis[i].x + dataSourceAxis[i + 1].x) / 2 / total)
    }
    arr.push(item)
  }
  return arr
}
/**
 * 参数支持传入number[]类型，最终处理为 LabelValue<string, number>[]类型
 * 执行并返回数组、数组最小值、最大值、最大差值
 * @param data
 * @return { values, min, max, diff }
 */
export const getAxisDataSource = (data: LabelValue<string, number>[] | number[]) => {
  if (Object.prototype.toString.call(data[0]) === '[object Number]') {
    data = (data as any[]).reduce((prev, curr) => [...prev, { label: curr, value: curr }], [])
  }
  const min = Math.min(...(data as any[]).reduce((prev, curr) => [...prev, curr.value], []))
  const max = Math.max(...(data as any[]).reduce((prev, curr) => [...prev, curr.value], []))
  return {
    values: (data as any[]).sort((prev, curr) => prev.value - curr.value),
    min,
    max,
    diff: max - min
  }
}
/**
 * 获取曲线系数
 * @param type
 */
export const getLineCoefficient = (type: LineType) => {
  let cft = 0
  switch (type) {
    case 'polyline':
      cft = CANVAS_LINE_POLYLINE_COEFFICIENT
      break
    case 'curve':
      cft = CANVAS_LINE_CURVE_COEFFICIENT
      break
    default:
      cft = CANVAS_LINE_POLYLINE_COEFFICIENT
  }
  return cft
}