export const code = `
~~~js
const OptimizeSample = (props: any) => {
  const {
    dataSource,
    setValue,
  } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lineChart = useLineChart(canvasRef)

  const xValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  const yValues = [0, 20, 40, 60, 80, 100]

  const initChart = () => {
    if (lineChart.chart.initialized) {
      lineChart.draw({
        dataSource
      })
    } else {
      lineChart.init({
        dataSource,
        yAxis: { values: yValues },
        xAxis: { values: xValues },
        style: {
          line: {
            lineType: 'polyline'
          }
        }
      })
    }

    const data = lineChart.initPoint()
    data && setValue(data)
  }

  const onMouseMove = (event: any) => {
    const data = lineChart.onMouseMove(event)
    data && setValue(data)
  }

  useEffect(() => {
    initChart()
  }, [dataSource])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%'}}
      onMouseMove={onMouseMove}
      >
    </canvas>
  )
}
~~~
`
