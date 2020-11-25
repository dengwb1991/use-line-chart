import React from 'react'
import ReactDOM from 'react-dom'
import CompleteSample from './views/complete-sample/index'
import EasySample from './views/easy-sample/index'
import OptimizeSample from './views/optimize-sample/index'
import './assets/css/main.less'

const Index: React.FunctionComponent = () => {
  return (
    <div className="grid-container">
      <div className="row">
        <div className="col-md-6 col-xs-4">
          <CompleteSample/>
        </div>
        <div className="col-md-6 col-xs-4">
          <EasySample/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-xs-4">
          <OptimizeSample/>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<Index/>, document.getElementById('app'))