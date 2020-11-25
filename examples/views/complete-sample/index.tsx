import React, { useState } from 'react'
import Main from './main'
import { code } from './code'
import View from '../../components/view/index'
import Codes from '../../components/codes/index'
import './index.less'

const Index = () => {
  const [dataSource, setDataSource] = useState([
    { x: 1, y: 0.4 },
    { x: 2, y: 0.6 },
    { x: 3, y: 0.2 },
    { x: 4, y: 0.5 },
    { x: 5, y: 0.3 },
    { x: 6, y: 0.8 },
  ])
  const [value, setValue] = useState({ x: null, y: null })
  const [lineType, setLineType] = useState('curve')
  const [fill, setFill] = useState(true)
  const [point, setPoint] = useState(true)

  const getRandom = () => {
    const arr = []
    const x = [1, 2, 3, 4, 5, 6]
    for (let i = 0, len = x.length; i < len; i++) {
      arr.push({
        x: x[i],
        y: +Math.random().toFixed(2)
      })
    }
    setDataSource(arr)
  }

  const changeLineType = () => {
    setLineType(lineType === 'curve' ? 'polyline' : 'curve')
  }
  const changeFill = () => {
    setFill(!fill)
  }
  const changePoint = () => {
    setPoint(!point)
  }

  return (
    <View
      title="完整示例"
      sample={
        <div>
          <div className="top-wrap">
            <div className="top-wrap-btn">
              <button onClick={getRandom}>更换数据</button>
              <button onClick={changeLineType}>切换{lineType === 'curve' ? '直线' : '曲线'}</button>
              <button onClick={changeFill}>{fill ? '隐藏' : '展示'}填充</button>
              <button onClick={changePoint}>{point ? '隐藏' : '展示'}辅助线</button>
            </div>
          </div>
          <div className="top-wrap-value">
            { point && <span>Value: x={value.x} y={value.y}</span> }
          </div>
          <div style={{ height: '240px' }}>
            <Main
              dataSource={dataSource}
              setValue={setValue}
              lineType={lineType}
              fill={fill}
              point={point}/>
          </div>
        </div>
      }
      md={
        <Codes md={code}/>
      }
    />
  )
}

export default Index