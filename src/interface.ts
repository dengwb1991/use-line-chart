export interface Point {
  x: number,
  y: number
}
/**
 * canvas refs
 */
export interface RefObject<T> {
  readonly current: T | null
}

export interface DataIndex {
  x: string,
  y: string
}

export interface LabelValue<T, N> {
  label: T
  value: N
}

export interface ChartRef {
  ctx: any
  chartWidth: number
  initialized: boolean
  dataIndex: DataIndex
  dataSource: any[]
  dataSourceAxis: any[]
  xAxis: {
    values: LabelValue<string, number>[],
    min: number,
    max: number,
    diff: number,
  }
  yAxis: {
    values: LabelValue<string, number>[],
    min: number,
    max: number,
    diff: number,
  }
  padding: string | number[]
  min: number[]
  max: number[]
  diff: number[]
  height: number
  width: number
  contentHeight: number
  contentWidth: number,
  step: boolean | boolean[]
}

export type LineType = 'polyline' | 'curve'
/**
 * 曲线选项
 */
export interface LineOptions {
  lineType?: LineType,
  lineWidth?: number,
  strokeStyle?: string,
  lineFill?: boolean
}
/**
 * x/y轴选项
 */
export interface AxisOptions {
  font?: string,
  textBaseline?: string,
  fillStyle?: string,
  lineWidth?: number,
  strokeStyle?: string,
}


export interface DrawOptions {
  dataSource?: any[]
  dataIndex?: DataIndex
  xAxis?: {
    values: LabelValue<string, number>[],
    min: number,
    max: number,
    diff: number,
  } | any
  yAxis?: {
    values: LabelValue<string, number>[],
    min: number,
    max: number,
    diff: number,
  } | any,
}
/**
 * return use-line-chart Type
 */
export interface Chart {
  chart: {
    ctx: CanvasRenderingContext2D | null,
    initialized: boolean,
  },
  init: (options: {
    dataSource: any[]
    dataIndex?: DataIndex
    isDraw?: boolean | boolean[]
    xAxis: {
      values: any
    },
    yAxis: {
      values: any
    },
    padding?: string | number[],
    style?: object
  }) => void,
  draw: (options?: {
    dataSource?: any[],
    dataIndex?: DataIndex,
    xAxis?: {
      values: any
    },
    yAxis?: {
      values: any
    }
  }) => void,
  clearCanvas: () => void,
  onMouseMove: (event: MouseEvent) => object | undefined,
  initPoint: (index?: number) => object | undefined,
}

export interface InitOptions {
  dataSource: any[]
  dataIndex?: DataIndex
  isDraw?: boolean | boolean[]
  xAxis: {
    values: any
  },
  yAxis: {
    values: any
  },
  padding?: string | number[],
  style?: {
    line?: {
      strokeStyle?: string,
      width?: number,
      type?: string,
    },
    fill?: {
      visible?: boolean,
      style?: string,
    },
    xAxis?: {
      font?: string,
      textBaseline?: string,
      fillStyle?: string,
      lineWidth?: number,
      strokeStyle?: string,
    },
    yAxis?: {
      font?: string,
      textBaseline?: string,
      fillStyle?: string,
      lineWidth?: number,
      strokeStyle?: string,
    },
    auxiliaryLine?: {
      strokeStyle?: string,
      fillStyle?: string
    }
  }
}
