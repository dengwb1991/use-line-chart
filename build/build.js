import { uglify } from 'rollup-plugin-uglify'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
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
    globals: {
      'react': 'React',
    }
  },
  external: ['react'],
  plugins: [
    typescript(),
    babel({ babelHelpers: 'bundled' }),
    nodeResolve(),
    commonjs(),
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