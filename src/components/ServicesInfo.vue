<template>
<div style="">
  <el-row :gutter="20">
    <el-col :span="24">
      <el-button-group style="float:right;margin-top:1%;">
        <el-button type="primary" icon="el-icon-back" @click="back"></el-button>
        <el-button type="primary" icon="el-icon-view" @click="drawer=true"></el-button>
        <el-drawer :visible.sync="drawer" :with-header="false" size='50%'>
          <el-collapse v-model="activeNames" style="margin:2% 2%;">
            <el-collapse-item :title="log.name" v-for="log in logData" :key=log>
              <div style="overflow:scroll;height:900px;white-space: pre-line;">{{log.content}}</div>
            </el-collapse-item>
          </el-collapse>
        </el-drawer>
      </el-button-group>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content-desc">
            <p>
              Deployment Describe
            </p>
            <el-table :data="deploymentData" size="mini" style="width: 100%">
              <el-table-column prop="time" :formatter="startTimeFormatter" label="时间" width="150">
              </el-table-column>
              <el-table-column prop="kind" label="资源类型" width="200">
              </el-table-column>
              <el-table-column prop="name" label="资源名称" width="200">
              </el-table-column>
              <el-table-column prop="type" label="类型" width="200">
              </el-table-column>
              <el-table-column prop="reason" label="原因" width="200">
              </el-table-column>
              <el-table-column prop="message" label="信息" width="580">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <p>
          Replicaset Describe
        </p>
        <el-col :span="24">
          <div class="grid-content-desc">
            <el-table :data="replicasetData" size="mini" style="width: 100%">
              <el-table-column prop="time" :formatter="startTimeFormatter" label="时间" width="150">
              </el-table-column>
              <el-table-column prop="kind" label="资源类型" width="200">
              </el-table-column>
              <el-table-column prop="name" label="资源名称" width="200">
              </el-table-column>
              <el-table-column prop="type" label="类型" width="200">
              </el-table-column>
              <el-table-column prop="reason" label="原因" width="200">
              </el-table-column>
              <el-table-column prop="message" label="信息" width="580">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <p>
          Pod Describe
        </p>
        <el-col :span="24">
          <div class="grid-content-desc">
            <el-table :data="podData" size="mini" style="width: 100%">
              <el-table-column prop="time" :formatter="startTimeFormatter" label="时间" width="150">
              </el-table-column>
              <el-table-column prop="kind" label="资源类型" width="200">
              </el-table-column>
              <el-table-column prop="name" label="资源名称" width="200">
              </el-table-column>
              <el-table-column prop="type" label="类型" width="200">
              </el-table-column>
              <el-table-column prop="reason" label="原因" width="200">
              </el-table-column>
              <el-table-column prop="message" label="信息" width="580">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</div>
</template>



<script>
import axios from 'axios'

export default {
  name: 'ServicesInfo',
  data() {
    return {
      suspect: {},
      deploymentData: [],
      replicasetData: [],
      podData: [],
      drawer: false,
      logData: [{
        name: "name1",
        content: "content1"
      }, {
        name: "name2",
        content: "content2"
      }]
    }
  },
  created() {
    this.suspect = this.$route.query
    this.getDesc()
    this.getLog()
    // this.timer = window.setInterval(() => {
    //     setTimeout(() => {
    //       this.getDesc()
    //     },0)
    // },5000)
  },
  methods: {
    back: function() {
      this.$router.push({
        path: '/services'
      })
    },
    getDesc() {
      axios
        .get(this.global.apiUrl + '/services', {
          params: {
            action: "desc",
            namespace: this.suspect.namespace,
            name: this.suspect.name
          }
        })
        .then(res => {
          this.deploymentData = res.data.deployment
          this.replicasetData = res.data.replicaset
          this.podData = res.data.pod
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getLog() {
      axios
        .get(this.global.apiUrl + '/services', {
          params: {
            action: "log",
            namespace: this.suspect.namespace,
            name: this.suspect.name
          }
        })
        .then(res => {
          this.logData = res.data
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    startTimeFormatter(row, column, cellValue, index) {
      var str = ""
      var e = cellValue.split(" ")
      str += e[0] + " " + e[1] + '\n'
      return str
    },
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content-desc {
  border-radius: 4px;
  min-height: 36px;
}

.grid-content-log {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
