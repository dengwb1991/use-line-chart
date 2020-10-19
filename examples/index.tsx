import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Line from './line'
import './assets/css/grid.less'

const Index: React.FunctionComponent = () => {
  const [dataSource, setDataSource] = useState([
    { x: 50, y: 2 },
    { x: 150, y: 1 },
    // { x: 100, y: 0 },
    // { x: 200, y: 1 },
    // { x: 300, y: 1 },
    { x: 400, y: 3 },
    { x: 500, y: 1 },
    // { x: 150, y: 2 },
    // { x: 250, y: 1 },
    // { x: 350, y: 2 },
    // { x: 450, y: 1.5 },
  ])

  const getRandom = () => {
    const arr = []
    const x = [0, 100, 200, 300, 400, 500]
    for (let i = 0, len = x.length; i < len; i++) {
      arr.push({
        x: x[i],
        y: +(Math.random() * 3).toFixed(2)
      })
    }
    setDataSource(arr)
  }
  return (
    <div className="grid-container">
      <div>hello</div>
      <button onClick={getRandom}>更换</button>
      <div style={{ width: '400px', height: '240px' }}>
        <Line dataSource={dataSource}/>
      </div>
      
    </div>
  )
}

ReactDOM.render(<Index/>, document.getElementById('app'))