<template>

  <div>
    <ul>

    </ul>
  </div>

</template>

<style>

</style>

<script>

  import axios from 'axios'

  export default {
    data() {
      return {
        tableData: []
      }
    },
    created() {
      axios
        //.get('https://klog.ciiplat.com/nodes')
        .get('http://172.16.178.13:8080/warnings')
        .then(res => {
          this.tableData = res.data
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }

</script>
