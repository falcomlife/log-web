<template>
<div class="demo-image__lazy">
  <el-input v-model="input" placeholder="请输入日期(例如:2000-01-01)" @change="inputChange"></el-input>
  <div style="overflow:scroll;" bac v-for="url in urls" :key=url>
    <el-image class="result-image" :src="url" lazy></el-image>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Echarts',
  created() {
    this.input = this.getCurrentTime()
    this.getImagesName()
  },
  methods: {
    getImagesName() {
      axios
        //.get('http://localhost:8080/chart?date=' + this.input)
        .get('https://klog.ciiplat.com/chart?date=' + this.input)
        .then(res => {
          this.urls = []
          for (var i = 0; i < res.data.length; i++) {
            // this.urls.push("http://localhost:8080/ai/result/" + this.input + "/" + res.data[i])
            this.urls.push("https://klog.ciiplat.com/ai/result/" + this.input + "/" + res.data[i])
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getCurrentTime() {
      //获取当前时间并打印
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
      let dd = new Date().getDate() < 10 ? '0' + (new Date().getDate()) : new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
      return yy + '-' + mm + '-' + dd;
    },
    inputChange(item) {
      this.input = item
      this.getImagesName()
    }
  },
  data() {
    return {
      urls: [],
      input: ""
    }
  }
}
</script>

<style>
.result-image {
  height: 300px;
  width: 15000px;
}
</style>
