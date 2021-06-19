export default class VueRouter_First {
  options

  constructor(options) {
    this.options = options
  }

  static install(Vue) {
    Vue.component('router-view', {
      render(h) {
        console.log(this.$root.$data.key)
        let {routes, base} = this.$root.$options.router.options
        base = base.replace(/\/+$/, '')
        this.$root.$options.router.options.base = base
        let matchedRoute = routes.find(i => i.path === location.pathname.replace(base, ''))
        return h(matchedRoute && matchedRoute.component)
      }
    })
    Vue.component('router-link', {
      props: ['to'],
      render(h) {
        let handleClick = e => {
          e.preventDefault()
          let {base} = this.$root.$options.router.options
          history.pushState(null, null, base + this.to)
          this.$root.$data.key++
        }
        return <a href={this.to} onClick={handleClick}>{this.$slots.default}</a>
      }
    })
  }
}
