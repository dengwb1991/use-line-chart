import React, { useState, useEffect } from 'react'
import Main from './main'
import { code } from './code'
import View from '../../components/view/index'
import Codes from '../../components/codes/index'
import './index.less'

const Index = () => {
  const [dataSource, setDataSource] = useState([])
  const [value, setValue] = useState({ x: null, y: null })

  const getRandom = () => {
    const arr = []
    for (let i = 0; i <= 100; i++) {
      arr.push({
        x: i,
        y: Math.floor(Math.random() * 100)
      })
    }
    setDataSource(arr as any)
  }

  useEffect(() => {
    getRandom()
  }, [])

  return (
    <View
      title="优化示例"
      sample={
        <div>
          <div className="top-wrap">
            <div className="top-wrap-btn">
              <button onClick={getRandom}>更换数据</button>
            </div>
          </div>
          <div className="top-wrap-value">
            { <span>Value: x={value.x} y={value.y}</span> }
          </div>
          <div style={{ height: '240px' }}>
            <Main
              dataSource={dataSource}
              setValue={setValue}/>
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