<template>
<div id="app">
  <el-container direction="vertical">
    <el-header class="title">Klog</el-header>
    <el-container direction="horizontal">
      <el-aside>
        <el-row>
          <el-col>
            <el-menu default-active="/services" router>
              <el-menu-item index="/services">
                <span>Services</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: '/'
    }
  }
}
</script>

<style>

.nav {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: bold 40px/60px arial,sans-serif;
}

.content {
  float: left;
  width: 92%;
}

.title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: bold 40px/60px arial,sans-serif;
  color: #fff;
  background-color: #99CCFF;
}
body{
  margin: 0px;
}
</style>
