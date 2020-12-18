<template>

  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/warning" class="nav">警告</el-menu-item>
      <el-menu-item index="/node" class="nav">Node</el-menu-item>
      <el-menu-item index="/pod" class="nav">Pod</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>

</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        activeIndex: '/warning'
      }
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
  .nav {
    font-weight: bold;
    width: 20%;
  }

</style>
