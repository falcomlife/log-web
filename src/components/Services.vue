<template>
<div>
  <el-row class="row">
    <el-col :span="24">
      <el-button-group>
        <el-tooltip class="item" effect="light" content="获取maven打包方式的Java后台服务CI文件" placement="bottom">
          <el-button type="primary" icon="el-icon-document-add" @click="drawerjava=true" size=mini round>Java</el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="获取npm打包方式的前台服务CI文件" placement="bottom">
          <el-button type="primary" icon="el-icon-document-add" @click="drawernpm=true" size=mini round>Npm</el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="light" content="获取dotnet服务CI文件" placement="bottom">
          <el-button type="primary" icon="el-icon-document-add" @click="drawernet=true" size=mini round>.net</el-button>
        </el-tooltip>
      </el-button-group>
      <el-drawer :visible.sync="drawerjava" :with-header="false" size='50%'>
        <div style="padding: 10% 10%;">
          <el-form ref="form" :rules="rules" :model="form" size="small">
            <el-form-item label="分组" prop="namespace">
              <el-input v-model="form.namespace" placeholder="请输入分组名，由管理员分配"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入微服务英文名称，同一个分组内必须唯一"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describe">
              <el-input v-model="form.describe" placeholder="请输入微服务的中文名称"></el-input>
            </el-form-item>
            <el-form-item label="Git地址" prop="gitUrl">
              <el-input v-model="form.gitUrl" placeholder="请输入gitlab仓库地址（拉取代码的url,通常已.git结尾）"></el-input>
            </el-form-item>
            <el-form-item label="分支名/Tag" prop="onlyRefs">
              <el-input v-model="form.onlyRefs" placeholder="测试环境请输入测试主分支，生产环境请输入'tags'"></el-input>
            </el-form-item>
            <el-form-item label="产物" prop="artifactsPaths">
              <el-input v-model="form.artifactsPaths" placeholder="请输入jar包路径，从根目录开始，例如target/demo.jar"></el-input>
            </el-form-item>
            <el-form-item label="端口" prop="port">
              <el-input v-model="form.port" placeholder="请输入微服务端口，对应spring-boot的server.port配置"></el-input>
            </el-form-item>
            <el-form-item label="健康检查路径" prop="health">
              <el-input v-model="form.health" placeholder="请输入包含server.servlet.context-path的路径，例如/${context-path}/actuator/health"></el-input>
            </el-form-item>
            <el-form-item>
              <span>
                <font style="font:bold 12px;color: red;">获取配置文件后，解压到项目的根目录，一起提交。</font>
              </span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitFormJava('form')">获取配置文件</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
      <!-- <el-drawer :visible.sync="drawernpm" :with-header="false" size='50%'>
        <el-form ref="form" :model="form">
          <el-form-item :required=true label="分组">
            <el-input v-model="form.namespace"></el-input>
          </el-form-item>
          <el-form-item :required=true label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :required=true label="描述">
            <el-input v-model="form.describe"></el-input>
          </el-form-item>
          <el-form-item :required=true label="Git地址">
            <el-input v-model="form.gitUrl"></el-input>
          </el-form-item>
          <el-form-item :required=true label="分支名/Tag">
            <el-input v-model="form.onlyRefs"></el-input>
          </el-form-item>
          <el-form-item :required=true label="产物">
            <el-input v-model="form.artifactsPaths"></el-input>
          </el-form-item>
          <el-form-item :required=true label="端口">
            <el-input v-model="form.port"></el-input>
          </el-form-item>
          <el-form-item :required=true label="健康检查路径">
            <el-input v-model="form.health"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-drawer> -->
      <!-- <el-drawer :visible.sync="drawernet" :with-header="false" size='50%'>
        <el-form ref="form" :model="form" label-width="15%">
          <el-form-item :required=true label="分组">
            <el-input v-model="form.namespace"></el-input>
          </el-form-item>
          <el-form-item :required=true label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :required=true label="描述">
            <el-input v-model="form.describe"></el-input>
          </el-form-item>
          <el-form-item :required=true label="Git地址">
            <el-input v-model="form.gitUrl"></el-input>
          </el-form-item>
          <el-form-item :required=true label="分支名/Tag">
            <el-input v-model="form.onlyRefs"></el-input>
          </el-form-item>
          <el-form-item :required=true label="产物">
            <el-input v-model="form.artifactsPaths"></el-input>
          </el-form-item>
          <el-form-item :required=true label="端口">
            <el-input v-model="form.port"></el-input>
          </el-form-item>
          <el-form-item :required=true label="健康检查路径">
            <el-input v-model="form.health"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-drawer> -->
    </el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="24">
      <el-table :data="tableData">
        <el-table-column fixed prop="namespace" label="Namespace" width=100> </el-table-column>
        <el-table-column fixed prop="name" label="名称" width=100> </el-table-column>
        <el-table-column prop="description" label="说明" width=150> </el-table-column>
        <el-table-column prop="kind" label="负载类型" width=100> </el-table-column>
        <el-table-column prop="podStatus" :formatter="podStatusFormatter" label="状态" width=100> </el-table-column>
        <el-table-column prop="podNames" :formatter="podNamesFormatter" label="下辖Pod" width=200> </el-table-column>
        <el-table-column prop="startTime" :formatter="startTimeFormatter" label="启动时间" width=200> </el-table-column>
        <el-table-column prop="duration" :formatter="durationFormatter" label="存活时间（秒）" width=200> </el-table-column>
        <el-table-column prop="restartTimes" :formatter="restartTimesFormatter" label="重启次数" width=100> </el-table-column>
        <el-table-column prop="innerUrl" label="内部调用地址" width=300> </el-table-column>
        <el-table-column prop="gatewayUrl" label="外部调用地址" width=400> </el-table-column>
        <el-table-column prop="gitUrl" label="仓库地址" width=400> </el-table-column>
        <el-table-column prop="replicas" label="要求副本数" width=100> </el-table-column>
        <el-table-column prop="ready" label="正常运行副本数" width=150> </el-table-column>
        <el-table-column fixed="right" label="操作" width=160>
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="重启" placement="bottom">
              <el-button type="primary" icon="el-icon-refresh" circle @click="restartClick(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="回滚" placement="bottom">
              <el-button type="primary" icon="el-icon-d-arrow-left" circle @click="rollbackClick(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="详情" placement="bottom">
              <el-button type="primary" icon="el-icon-info" circle @click="infoClick(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PodTable',
  data() {
    var namespace = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 15) {
        return callback(new Error('长度不能超过15'));
      } else if (!(/[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/.test(value))) {
        return callback(new Error('必须由小写字母,数字,字符“-”或“.”组成'));
      } else {
        callback();
      }
    };
    var name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 15) {
        return callback(new Error('长度不能超过15'));
      } else if (!(/[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/.test(value))) {
        return callback(new Error('必须由小写字母,数字,字符“-”或“.”组成'));
      } else {
        callback();
      }
    };
    var describe = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var gitUrl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var onlyRefs = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var artifactsPaths = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var port = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var health = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      form: {
        namespace: "",
        name: "",
        describe: "",
        gitUrl: "",
        onlyRefs: "",
        artifactsPaths: "",
        port: "",
        health: ""
      },
      drawerjava: false,
      drawernpm: false,
      drawernet: false,
      rules: {
        namespace: [{
          validator: namespace,
          trigger: 'blur'
        }],
        name: [{
          validator: name,
          trigger: 'blur'
        }],
        describe: [{
          validator: describe,
          trigger: 'blur'
        }],
        gitUrl: [{
          validator: gitUrl,
          trigger: 'blur'
        }],
        onlyRefs: [{
          validator: onlyRefs,
          trigger: 'blur'
        }],
        artifactsPaths: [{
          validator: artifactsPaths,
          trigger: 'blur'
        }],
        port: [{
          validator: port,
          trigger: 'blur'
        }],
        health: [{
          validator: health,
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.getServiceList()
    // this.timer = window.setInterval(() => {
    //   setTimeout(() => {
    //     this.getServiceList()
    //   }, 0)
    // }, 5000)
  },
  methods: {
    getServiceList() {
      axios
        .get(this.global.apiUrl + '/services', {
          params: {
            action: "list"
          }
        })
        .then(res => {
          this.tableData = res.data
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    podNamesFormatter(row, column, cellValue, index) {
      var str = ""
      cellValue.forEach(function(element) {
        str += element + '\n'
      })
      return str
    },
    podStatusFormatter(row, column, cellValue, index) {
      var str = ""
      cellValue.forEach(function(element) {
        str += element + '\n'
      })
      return str
    },
    startTimeFormatter(row, column, cellValue, index) {
      var str = ""
      cellValue.forEach(function(element) {
        var e = element.split(" ")
        str += e[0] + " " + e[1] + '\n'
      })
      return str
    },
    durationFormatter(row, column, cellValue, index) {
      var str = ""
      for (var i = 0; i < cellValue.length; i++) {
        var element = cellValue[i]
        var time = this.$options.methods.formatterSecondTime(element)
        str += time + '\n'
      }
      return str
    },
    restartTimesFormatter(row, column, cellValue, index) {
      var str = ""
      cellValue.forEach(function(element) {
        str += element + '\n'
      })
      return str
    },
    formatterSecondTime(second) {
      var theTime = parseInt(second); // 秒
      var theTime1 = 0; // 分
      var theTime2 = 0; // 小时
      var theTime3 = 0; // 天
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
          if (theTime2 > 24) {
            theTime3 = parseInt(theTime1 / 24);
            theTime2 = parseInt(theTime1 % 24);
          }
        }
      }
      let result = "" + parseInt(theTime) + "秒";
      result = "" + (theTime1 > 0 ? parseInt(theTime1) : "0") + "分" + result;
      result = "" + (theTime2 > 0 ? parseInt(theTime2) : "0") + "小时" + result;
      result = "" + (theTime3 > 0 ? parseInt(theTime3) : "0") + "天" + result;
      return result;
    },
    restartClick(row) {
      axios
        .post(this.global.apiUrl + '/services', JSON.stringify({
          "action": "restart",
          "name": row.name,
          "namespace": row.namespace,
          "kind": row.kind
        }))
        .then(res => {
          if (res.data == "success") {
            this.$message({
              showClose: true,
              message: '重启成功',
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: res.data,
              type: 'error'
            });
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    rollbackClick(row) {
      axios
        .post(this.global.apiUrl + '/services', JSON.stringify({
          "action": "rollback",
          "name": row.name,
          "namespace": row.namespace,
          "kind": row.kind
        }))
        .then(res => {
          if (res.data == "success") {
            this.$message({
              showClose: true,
              message: '重启成功',
              type: 'success'
            });
          } else {
            this.$message({
              showClose: true,
              message: res.data,
              type: 'error'
            });
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    infoClick(row) {
      this.$router.push({
        path: '/servicesinfo',
        query: row
      })
    },
    submitFormJava(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          axios
            .put(this.global.apiUrl + '/services', JSON.stringify(this.form))
            .then(res => {
              if (res.data == "success") {
                this.$message({
                  showClose: true,
                  message: '创建成功',
                  type: 'success'
                });
                window.open(this.global.apiUrl + "/ci.zip");
              } else {
                this.$message({
                  showClose: true,
                  message: res.data,
                  type: 'error'
                });
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
.el-table .cell {
  white-space: pre-line;
}

.row {
  margin-bottom: 10px;
}
</style>
