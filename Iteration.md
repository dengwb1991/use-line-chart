## iteration

### 2020.10.19

**question:**

```bash
(!) Missing global variable name
Use output.globals to specify browser global variable names corresponding to external modules
react (guessing 'react')
```

**answer:**

```js
// build/build.js  rollup.config

{
  output: {
    globals: {
      'react': 'React',
    }
  },
  external: ['react'],
  ...
}
```