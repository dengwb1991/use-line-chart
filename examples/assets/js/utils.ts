const utils = {
  debounce: (fn: Function, delay: number = 300) => {
    let timer: any = 0
    return function (this: any) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this. arguments)
      }, delay)
    }
  }
}

export default utils