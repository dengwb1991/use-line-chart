import React from 'react'
import Main from './main'
import { code } from './code'
import View from '../../components/view/index'
import Codes from '../../components/codes/index'

const Index = () => {
  return (
    <View
      title="简单示例"
      sample={
        <div style={{ height: '240px' }}>
          <Main/>
        </div>
      }
      md={
        <Codes md={code}/>
      }>
    </View>
  )
}

export default Index