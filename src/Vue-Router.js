import History from "./History";

export default class VueRouter {
  options

  constructor(options) {
    this.options = options
  }

  static install(Vue) {
    Vue.mixin({
      beforeCreate() {
        if (this.$options.router) { // root
          this._router = this.$options.router
          const history = new History()
          this._router.history = history
        }
      }
    })
    Vue.component('router-view', {
      render(h) {
        console.log(this.$root.$data.key)
        let {routes, base} = this.$root.$options.router.options;
        base = base.replace(/\/+$/, '')
        this.$root.$options.router.options.base = base
        let path = location.pathname.replace(base, '')
        let route = routes.find(i => i.path === path)
        if (!route) return h()
        return h(route.component)
      }
    })
    Vue.component('router-link', {
      props: ['to'],
      render(h) {
        let handleClick = (e) => {
          e.preventDefault()
          let {base} = this.$root.$options.router.options
          history.pushState(null, null, base + this.to)
          this.$root.$data.key++
        }
        return <a href={this.to} onClick={handleClick}>{this.$slots.default}</a>
      }
    })
    Object.defineProperty(Vue.prototype, '$router', {
      get() {
        return this.$root._router
      }
    })
    Object.defineProperty(Vue.prototype, '$route', {})
  }
}
