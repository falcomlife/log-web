<template>

  <div style="width:100%;padding-top:2%;pading-bottom:2%" >
    <el-table :data="tableData" style="width: 96%;margin-left:2%" height="600">
      <el-table-column fixed prop="namespace" label="Namespace"> </el-table-column>
      <el-table-column fixed prop="name" label="Pod"> </el-table-column>
      <el-table-column prop="cpuSumMax" label="Cpu最大值 (m)" sortable></el-table-column>
      <el-table-column :formatter="cellFormatter" label="Cpu最大时刻" sortable></el-table-column>
      <el-table-column prop="cpuSumMin" label="Cpu最小值 (m)" sortable></el-table-column>
      <el-table-column :formatter="cellFormatter" label="Cpu最小时刻" sortable></el-table-column>
      <el-table-column prop="cpuVolatility" label="Cpu幅度 (m)" sortable></el-table-column>
      <el-table-column prop="cpuSumAvg" label="Cpu平均值 (m)" sortable></el-table-column>
      <el-table-column prop="cpuMaxRatio" label="Cpu最快增幅 (m)" sortable></el-table-column>
      <el-table-column prop="memMax" label="Mem最大值 (Mi)" sortable></el-table-column>
      <el-table-column :formatter="cellFormatter" label="Mem最大时刻" sortable></el-table-column>
      <el-table-column prop="memMin" label="Mem最小值 (Mi)" sortable></el-table-column>
      <el-table-column :formatter="cellFormatter" label="Mem最小时刻" sortable></el-table-column>
      <el-table-column prop="memVolatility" label="Mem幅度 (Mi)" sortable></el-table-column>
      <el-table-column prop="memAvg" label="Mem平均值 (Mi)" sortable></el-table-column>
      <el-table-column prop="memMaxRatio" label="Mem最快增幅 (Mi)" sortable></el-table-column>
    </el-table>
  </div>

</template>

<script>

  import axios from 'axios'

  function splitTime(time) {
    if (time == '') {
      return ''
    }
    return time.split('T')[1].split('.')[0]
  }
  export default {
    name: 'PodTable',
    data() {
      return { tableData: [] }
    },
    created() {
      axios
        //.get('https://klog.ciiplat.com/pods')
        .get('http://172.16.178.13:8080/pods')
        .then(res => {
          this.tableData = res.data
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    methods: {
      cellFormatter(row, column, cellValue, index) {
          if (column.label == 'Cpu最大时刻') {
            return splitTime(row.cpuSumMaxTime)
          } else if (column.label == 'Cpu最小时刻') {
            return splitTime(row.cpuSumMinTime)
          } else if (column.label == 'Mem最大时刻') {
            return splitTime(row.memMaxTime)
          } else if (column.label == 'Mem最小时刻') {
            return splitTime(row.memMinTime)
          }
      }
    }
  }

</script>

<style scoped>

</style>
