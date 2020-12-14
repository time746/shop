<template>
  <div id="app">
    <!-- 路由占位 -->
    <router-view></router-view>
  </div>
</template>

<script>

import Login from 'components/Login'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>

</style>
