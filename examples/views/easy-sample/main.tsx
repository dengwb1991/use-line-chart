import React, { useRef, useEffect } from 'react'
import useLineChart from '../../../src/index'

const EasySample = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lineChart = useLineChart(canvasRef)

  const initChart = () => {
    lineChart.init({
      dataSource: [{ x: 100, y: 3 }, { x: 200, y: 2 }, { x: 300, y: 4 }, { x: 400, y: 1 }],
      yAxis: { values: [1, 2, 3, 4, 5] },
      xAxis: { values: [100, 200, 300, 400] }
    })
  }

  useEffect(() => {
    initChart()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
    >
    </canvas>
  )
}

export default EasySample