<template>

  <div style="width:100%;padding-top:2%;pading-bottom:2%;">
    <el-table :data="tableData" :span-method="objectSpanMethod" style="width: 96%;margin-left:2%">
      <el-table-column fixed prop="name" label="节点名"> </el-table-column>
      <el-table-column :formatter="cellFormatter" label="Cpu/Mem"></el-table-column>
      <el-table-column :formatter="cellFormatter" label="最大值"></el-table-column>
      <el-table-column :formatter="cellFormatter" label="最小值"></el-table-column>
      <el-table-column :formatter="cellFormatter" label="幅度"></el-table-column>
      <el-table-column :formatter="cellFormatter" label="平均值"></el-table-column>
      <el-table-column :formatter="cellFormatter" label="最快增幅"></el-table-column>
      <el-table-column :formatter="cellFormatter" label="磁盘使用情况"></el-table-column>
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
    name: 'NodeTable',
    data() {
      return { tableData: [] }
    },
    created() {
      axios
        .get('https://klog.ciiplat.com/nodes')
        //.get('http://172.16.179.13:8080/nodes')
        .then(res => {
          this.tableData = res.data
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 || columnIndex === 7) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      cellFormatter(row, column, cellValue, index) {
        if (index % 2 === 0) {
          if (column.label == 'Cpu/Mem') {
            return 'Cpu'
          } else if (column.label == '最大值') {
            return row.cpuSumMax + '% (' + splitTime(row.cpuSumMaxTime) + ')'
          } else if (column.label == '最小值') {
            return row.cpuSumMin + '% (' + splitTime(row.cpuSumMinTime) + ')'
          } else if (column.label == '幅度') {
            return row.cpuVolatility + '%'
          } else if (column.label == '平均值') {
            return row.cpuSumAvg + '%'
          } else if (column.label == '最快增幅') {
            return row.cpuMaxRatio + '%'
          } else if (column.label == '磁盘使用情况') {
            return row.diskUsed + 'Gi/' + row.diskTotal + 'Gi ' + row.diskUsedRatio + '%'
          }
        }
        if (index % 2 === 1) {
          if (column.label == 'Cpu/Mem') {
            return 'Mem'
          } else if (column.label == '最大值') {
            return row.memMax + 'Gi (' + splitTime(row.memMaxTime) + ')'
          } else if (column.label == '最小值') {
            return row.memMin + 'Gi ( ' + splitTime(row.memMinTime) + ')'
          } else if (column.label == '幅度') {
            return row.memVolatility + 'Gi'
          } else if (column.label == '平均值') {
            return row.memAvg + 'Gi'
          } else if (column.label == '最快增幅') {
            return row.memMaxRatio + '%'
          } else if (column.label == '磁盘使用情况') {
            return row.diskUsed + 'Gi/' + row.diskTotal + 'Gi ' + row.diskUsedRatio + '%'
          }
        }
      }
    }
  }

</script>

<style scoped>

</style>
