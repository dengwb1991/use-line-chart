interface DataIndex {
  x: string,
  y: string
}

interface AxisValues {
  label: string,
  value: number
}

interface Chart {
  chart: {
    ctx: CanvasRenderingContext2D | null,
    initialized: boolean,
  },
  init: (options: {
    dataSource: any[]
    dataIndex?: DataIndex
    isDraw?: boolean | boolean[]
    xAxis: {
      values: AxisValues[] | number[]
    },
    yAxis: {
      values: AxisValues[] | number[]
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
  }) => void,
  draw: (options?: {
    dataSource?: any[],
    dataIndex?: DataIndex,
    xAxis?: {
      values: AxisValues[] | number[]
    },
    yAxis?: {
      values: AxisValues[] | number[]
    }
  }) => void,
  clearCanvas: () => void,
  onMouseMove: (event: MouseEvent) => object | undefined,
  initPoint: (index?: number) => object | undefined,
}

declare function useLineChart (ref: React.RefObject<HTMLCanvasElement>): Chart

declare namespace useLineChart {
  interface Instance extends Chart {}
}

export as namespace useLineChart

export = useLineChart