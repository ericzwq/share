<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <com a="222"></com>
    <router-view/>
  </div>
</template>

<script>
let com = {
  // functional:true,
  props: ['prop', 'a'],
  mounted() {
    // console.log(this)
  },
  render(h) {
    // console.log('com render')
    let data = {routerView:2}
    return h('h1', {data}, 'is h1')
  }
}
export default {
  name: 'App',
  components: {
    com
  },
  mounted() {
    // setTimeout(()=>this.$router.push('/about/news'),1000)
    // console.log(this)
    // console.log('app before create')
  },
  updated() {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
