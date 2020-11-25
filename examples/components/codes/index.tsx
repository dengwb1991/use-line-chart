import React from 'react'

import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 as style } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Renderers = {
  code: function render ({ value }: any) {
    return <SyntaxHighlighter style={style} language="javascript">{value}</SyntaxHighlighter>
  }
}

interface Props {
  md: any;
}

const Codes = (props: Props) => {
  return (
    <ReactMarkdown renderers={Renderers}>{props.md}</ReactMarkdown>
  )
}

export default Codes