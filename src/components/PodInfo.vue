<template>

  <div style="width:100%;padding-top:2%;pading-bottom:2%;height:100%;">
    <el-card style="padding:2% 1%;" class="box-card">
      <div style="padding:5% 1%;">
        <ul style="padding-inline-start: 0px;list-style: none;text-align:left;">
          <li style="border-bottom: 1px solid #EBEEF5;">
            <p>
              <lable style="margin-left:2%;">Pod名称：</lable><span style="float:right;margin-right:2%;">{{this.suspect.name}}</span></p>
          </li>
          <li style="border-bottom: 1px solid #EBEEF5;">
            <p>
              <lable style="margin-left:2%;">命名空间：</lable><span style="float:right;margin-right:2%;">{{this.suspect.namespace}}</span></p>
          </li>
          <li style="border-bottom: 1px solid #EBEEF5;">
            <p>
              <lable style="margin-left:2%;">实际值：</lable>
              <span style="float:right;margin-right:2%;">
                <template v-if="this.suspect.type=='PodCpu'">{{this.suspect.actualValue + '%'}}</template>
                <template v-if="this.suspect.type=='PodMem'">{{this.suspect.actualValue + 'G'}}</template>
              </span>
            </p>
          </li>
          <li style="border-bottom: 1px solid #EBEEF5;">
            <p>
              <lable style="margin-left:2%;">浮动值：</lable>
              <span style="float:right;margin-right:2%;">
                <template v-if="this.suspect.type=='PodCpu'">{{this.suspect.volatility + '%'}}</template>
                <template v-if="this.suspect.type=='PodMem'">{{this.suspect.volatility + 'G'}}</template>
              </span>
            </p>
          </li>
          <li>
            <el-button style="float:right;margin-top:8%;margin-right:5%;" type="primary" icon="el-icon-arrow-left" circle @click="back"></el-button>
          </li>
        </ul>
      </div>
    </el-card>
  </div>

</template>

<script>

  import axios from 'axios'

  export default {
    name: 'PodInfo',
    data() {
      return {
        suspect: {}
      }
    },
    created() {
      this.suspect = this.$route.query
    },
    methods: {
      back: function() {
        this.$router.push({ path: '/warning' })
      }
    }
  }

</script>

<style scoped>

</style>
