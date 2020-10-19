import React, { useRef, useEffect } from 'react'
import useLineChart from '../dist/use-line-chart.js'

const Line: any = (props: any) => {
  const { dataSource } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lineChart = useLineChart(canvasRef)

  const initChart = () => {
    if (lineChart.chart.initialized) {
      lineChart.draw({
        dataSource,
        // yAxis: { values: () => [
        //   { label: '0.00', value: 0 },
        //   { label: '1.00', value: 1 },
        //   { label: '2.00', value: 2 },
        //   { label: '3.00', value: 3 },
        // ]},
        // xAxis: { values: () => [
        //   { label: '0m', value: 0 },
        //   { label: '100m', value: 100 },
        //   { label: '200m', value: 200 },
        //   { label: '300m', value: 300 },
        //   { label: '400m', value: 400 },
        //   { label: '600m', value: 600 },
        // ]},
      })
    } else {
      lineChart.init({
        dataSource,
        yAxis: { values: () => [
          { label: '0.00', value: 0 },
          { label: '1.00', value: 1 },
          { label: '2.00', value: 2 },
          { label: '3.00', value: 3 },
        ]},
        xAxis: { values: [
          { label: '0m', value: 0 },
          { label: '100m', value: 100 },
          { label: '200m', value: 200 },
          { label: '300m', value: 300 },
          { label: '400m', value: 400 },
          { label: '500m', value: 500 },
        ]},
        padding: '20 20 30 30',
        style: {
          fill: {
            // visible: false
          }
        }
      })
      // lineChart.draw()
    }
    const data = lineChart.initPoint()

    // console.log(data)
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
      // width="320"
      // height="240"
      >
    </canvas>
  )
}

export default Line