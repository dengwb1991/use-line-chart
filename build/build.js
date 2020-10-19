const { uglify } = require('rollup-plugin-uglify')
const replace = require('@rollup/plugin-replace')
import typescript from 'rollup-plugin-typescript2'
const version = process.env.VERSION || require('../package.json').version

const banner = 
`/**
* use-line-chart v${version}
* (c) ${new Date().getFullYear()} dengwb
* @license MIT
*/`

export default {
  input: 'src/index.ts',
  output: {
    banner,
    file: 'dist/use-line-chart.min.js',
    format: 'umd',
    name: 'useLineChart',
    sourcemap: false,
  },
  external: ['react'],
  plugins: [
    typescript(),
    uglify({
      output: {
        comments: function(node, comment) {
          if (comment.type === "comment2") {
            return /@preserve|@license|@dengwb/i.test(comment.value);
          }
          return false;
        }
      }
    }),
    replace({
      __VERSION__: version
    }),
  ]
}