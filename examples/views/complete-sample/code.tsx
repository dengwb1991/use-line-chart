export const code = `
~~~js
  const CompleteSample = (props: any) => {
    const { dataSource } = props
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const lineChart = useLineChart(canvasRef)
  
    const xValues = [
      { label: '星期一', value: 1 },
      { label: '星期二', value: 2 },
      { label: '星期三', value: 3 },
      { label: '星期四', value: 4 },
      { label: '星期五', value: 5 },
      { label: '星期六', value: 6 },
    ]
  
    const yValues = [
      { label: '0%', value: 0 },
      { label: '20%', value: 0.2 },
      { label: '40%', value: 0.4 },
      { label: '60%', value: 0.6 },
      { label: '80%', value: 0.8 },
      { label: '100%', value: 1 },
    ]
  
    const initChart = () => {
      if (lineChart.chart.initialized) {
        lineChart.draw({
          dataSource,
        })
      } else {
        lineChart.init({
          dataSource,
          yAxis: { values: yValues },
          xAxis: { values: xValues },
          padding: '20 20 30 40'
        })
      }
  
      lineChart.initPoint()
    }
  
    const onMouseMove = (event: any) => {
      const data = lineChart.onMouseMove(event)
      // console.log(data)
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
