import MyHistory from "./MyHistory";

export default class VueRouter {
  options
  app
  beforeHooks = []
  constructor(options) {
    this.options = options
  }

  push(...args) {
    this.history.push(...args)
  }
  beforeEach(hook) {
    this.beforeHooks.push(hook)
  }
  static install(Vue) {
    Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          this._router = this.$options.router
          this._router.app = this
          // this.router.init(this)
          let {base, mode} = this._router.options
          const history = new MyHistory(this._router,{
            base,
            mode
          })
          this._router.history = history
          history.listen(route=>this._route = route)
          // this._route = history.current
          Vue.util.defineReactive(this, '_route',history.current)
        } else {
          this._routerRoot = this.$parent && this.$parent._routerRoot || this
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$router', {
      get() {
        return this.$root._router
      }
    })
    Object.defineProperty(Vue.prototype, '$route',{
      get() {
        return this.$root._route
      }
    })
    Vue.component('router-view', {
      name: 'RouterView',
      functional: true,
      render(_, {data, parent, props}) {
        let h = parent.$createElement
        let depth = 0
        // let {routes, base} = parent.$router.options, depth = 0
        data.routerView = true
        // base = base.replace(/\/+$/, '')
        // parent.$router.options.base = base
        // console.log(parent.$route)

        let $route = parent.$route
        while (parent) {
          if (parent.$vnode && parent.$vnode.data.routerView) depth++
          parent = parent.$parent
        }
        let route = $route.matched[depth]
        if (!route) return h()
        return h(route.component, data)
      }
    })
    Vue.component('router-link', {
      props: ['to'],
      render(h) {
        let handleClick = e => {
          e.preventDefault()
          // let {base} = this.$router.options
          this.$router.push(this.to)
          // history.pushState(null, null, base.slice(0,-1) + this.to)
          // this.$root.$data.key++
        }
        return <a href={this.to} onClick={handleClick}>{this.$slots.default}</a>
      }
    })
  }
}
