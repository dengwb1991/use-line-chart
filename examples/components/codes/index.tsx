import React from 'react'

const ReactMarkdown = require('react-markdown')
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 as style } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const renderers = {
  code: ({ value }: any) => {
    return <SyntaxHighlighter style={style} language="javascript" children={value} />
  }
}

interface Props {
  md: any
}

const Codes = (props: Props) => {
  return (
    <ReactMarkdown renderers={renderers} children={props.md}></ReactMarkdown>
  )
}

export default Codes