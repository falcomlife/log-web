<template>

  <div class="warning-table">
    <el-table :data="tableData"
              :show-header="false"
              style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
                                <el-table label-position="left" inline class="demo-table-expand" :data="props.row.children"  style="width: 100%">
                                  <el-table-column prop="type" label="类型"></el-table-column>
                                  <el-table-column prop="describe" label="描述"></el-table-column>
                                  <el-table-column prop="warningValue" label="警戒值（%）">
                                    <template slot-scope="scope">
                                      <template v-if="scope.row.type=='Cpu'">{{ scope.row.warningValue + '%'}}</template>
        <template v-else>{{ scope.row.warningValue }}</template>
        </template>
      </el-table-column>
      <el-table-column prop="actual" label="实际值">
        <template slot-scope="scope">
                                      <template v-if="scope.row.type=='Cpu'"> {{ scope.row.actual + '%'}}</template>
        <template v-else> {{ scope.row.actual }}</template>
        </template>
      </el-table-column>
      <el-table-column prop="time" label=" 时间" :min-width="100" :formatter="timeFormatter"></el-table-column>
      <el-table-column label=" 嫌疑人" :min-width="100">
        <template slot-scope="props">
            <div>
              <div v-for="(sus,index) in props.row.suspect" :key="index">
                <p><el-button type="warning" round size="mini" @click="open(sus)">{{sus.namespace }}/{{sus.name}}</el-button></p>
              </div>
            </div>
        </template>
      </el-table-column>
    </el-table>
    </template>
    </el-table-column>
    <el-table-column label="节点名称" prop="name"></el-table-column>
    </el-table>
  </div>
</template>

<style>

</style>

<script>

  import axios from 'axios'
  import { parseTime } from '@/utils'

  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      this.refreshTableData()
    },
    methods: {
      open: function(sus) {
        this.$router.push({ path: '/podinfo', query: sus })
      },
      //刷新数据
      refreshTableData() {
        axios
          //.get('https://klog.ciiplat.com/warnings')
          .get('http://172.16.178.13:8080/warnings')
          .then(res => {
            this.tableData = res.data
          })
          .catch(function(error) {
            console.log(error)
          })
      },
      //时间格式化
      timeFormatter(row, column) {
        //{y}-{m}-{d} {h}:{i}:{s}
        return parseTime(new Date(row.time), '{h}:{i}:{s}')
      }
    }
  }

</script>

<style>

  .warning-table {
    width: 100%;
    padding-top: 2%;
    pading-bottom: 2%;
  }
  .warning-table .el-table__expanded-cell {
    padding: 0px 20px !important;
  }

</style>
