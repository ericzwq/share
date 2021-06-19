import {createRoute} from "./Route";

export default class MyHistory {
  base
  mode
  current
  router
  cb

  constructor(router, options) {
    let base = options.base.replace(/\/+$/, '')
    this.base = base
    this.mode = options.mode || 'history'
    this.router = router
    this.current = createRoute(router, location.pathname.replace(base, '') || '/')
  }

  push(path, force) {
    if (this.pending) return console.log('pending')
    const route = createRoute(this.router, path)
    let onComplete = () => {
      history.pushState(null, null, this.base + path)
      this.current = route
      this.cb && this.cb(route)
    }
    if (!force) {
      this.transitionTo(route, onComplete)
    } else {
      onComplete()
    }
  }

  transitionTo(route, cb) {
    this.iterator(this.router.beforeHooks, route, cb)
  }

  iterator(hooks, route, cb, index = 0) {
    this.pending = route
    if (index >= hooks.length) {
      cb && cb()
      return this.pending = null
    }
    let next, hook = hooks[index]
    const promise = new Promise(resolve => {
      next = resolve
    })
    hook(route, this.current, next)
    promise.then(r => {
      if (r === false) return
      if (typeof r === 'string' && r[0] === '/') {
        this.pending = null
        return this.push(r, true)
      }
      this.iterator(hooks, route, cb, ++index)
    })
  }

  listen(cb) {
    this.cb = cb
  }
}
