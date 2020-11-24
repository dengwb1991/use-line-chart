import React, { useState } from 'react'
import './index.less'

const View = (props: any) => {
  const [show, setShow] = useState(false)

  const changeShow = () => {
    setShow(!show)
  }
  return (
    <div className="view-wrap">
      <div className="code-title">
        {props.title}
      </div>
      <div className="code-sample">
        {props.sample}
      </div>
      <button onClick={changeShow}>{show ? '隐藏 code' : '展示 code'}</button>
      {
        show && <div className="code-md">
          {props.md}
        </div>
      }
    </div>
  )
}

export default View