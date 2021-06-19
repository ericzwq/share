<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link to="/about/news">News</router-link>
    <!--  News  -->
    <router-view></router-view>
  </div>
</template>

<script>
export  default {
  name: 'About',
  created() {
    // console.log(this)
  }
}
</script>
