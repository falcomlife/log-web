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
        <div style="padding: 4% 10%;">
          <el-tabs>
            <el-tab-pane label="单模块" style="margin-top:4%;overflow-y: scroll;" :style="{height: scrollerHeight}">
              <el-form ref="formJava" :rules="rules" :model="formJava" size="small">
                <el-form-item>
                  <span>
                    <font style="font-size:12px;color: red;">单模块适用的场景，是一个代码仓库中，只存储一个微服务模块。</font>
                  </span>
                </el-form-item>
                <el-form-item label="分组" prop="namespace">
                  <el-input v-model="formJava.namespace" placeholder="请输入分组名，由管理员分配"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                  <el-input v-model="formJava.name" placeholder="请输入微服务英文名称，同一个分组内必须唯一"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="describe">
                  <el-input v-model="formJava.describe" placeholder="请输入微服务的中文名称"></el-input>
                </el-form-item>
                <el-form-item label="Git地址" prop="gitUrl">
                  <el-input v-model="formJava.gitUrl" placeholder="请输入gitlab仓库地址（拉取代码的url,通常已.git结尾）"></el-input>
                </el-form-item>
                <el-form-item label="分支名/Tag" prop="onlyRefs">
                  <el-input v-model="formJava.onlyRefs" placeholder="测试环境请输入测试主分支，生产环境请输入'tags'"></el-input>
                </el-form-item>
                <el-form-item label="产物" prop="artifactsPaths">
                  <el-input v-model="formJava.artifactsPaths" placeholder="请输入jar包路径，从根目录开始，例如target/demo.jar"></el-input>
                </el-form-item>
                <el-form-item label="端口" prop="port">
                  <el-input v-model="formJava.port" placeholder="请输入微服务端口，对应spring-boot的server.port配置"></el-input>
                </el-form-item>
                <el-form-item label="路径前缀" prop="prefix">
                  <el-input v-model="formJava.prefix" placeholder="请输入server.servlet.context-path的路径，即全局统一的访问路径前缀" @blur="autocompletehealth($event)"></el-input>
                </el-form-item>
                <el-form-item label="健康检查路径" prop="health">
                  <el-input v-model="formJava.health" placeholder="请输入不包含server.servlet.context-path的路径，例如/actuator/health" @blur="autocompletehealth($event)"></el-input>
                </el-form-item>

                <el-form-item>
                  <span>
                    <font style="font-size:12px;color: red;">获取配置文件后，解压到项目的根目录，一起提交。</font>
                  </span>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitFormJava('formJava')">获取配置文件</el-button>
                  <el-button @click="resetFormJava('formJava')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="多模块" style="margin-top:4%;overflow-y: scroll;" :style="{height: scrollerHeight}">
              <el-form ref="formJavaMul" :rules="rules" :model="formJavaMul" size="small">
                <el-form-item>
                  <span>
                    <font style="font-size:12px;color: red;">多模块适用的场景，是一个代码仓库中，存储了多个微服务模块。</font>
                  </span>
                </el-form-item>
                <el-form-item label="分组" prop="namespace">
                  <el-input v-model="formJavaMul.namespace" placeholder="请输入分组名，由管理员分配"></el-input>
                </el-form-item>
                <el-form-item label="Git地址" prop="gitUrl">
                  <el-input v-model="formJavaMul.gitUrl" placeholder="请输入gitlab仓库地址（拉取代码的url,通常已.git结尾）"></el-input>
                </el-form-item>
                <el-form-item label="分支名/Tag" prop="onlyRefs">
                  <el-input v-model="formJavaMul.onlyRefs" placeholder="测试环境请输入测试主分支，生产环境请输入'tags'"></el-input>
                </el-form-item>
                <el-form-item>
                  <span>
                    <font style="font-size:12px;color: red;">获取配置文件后，解压到项目的根目录，一起提交。</font>
                  </span>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitFormJavaMul('formJavaMul')">获取配置文件</el-button>
                  <el-button @click="addService()">新增模块</el-button>
                  <el-button @click="resetFormJavaMul('formJavaMul')">重置</el-button>
                </el-form-item>
                <div v-for="(module, index) in formJavaMul.modules" :key="module.key">
                  <div style="margin: 2% 2%;padding:4% 4%;box-shadow: 2px 2px 5px #888888;">
                    <div>
                      <h4 style="float: left;">子模块{{index+1}}</h4>
                      <el-button style="float:right;" type="warning" circle icon="el-icon-minus" size="mini" @click.prevent="removeService(module)"></el-button>
                    </div>
                    <table style="width: 100%;">
                      <tr>
                        <td class="td1"><label for="name">名称:</label></td>
                        <td class="td2">
                          <el-form-item style="margin: 0px 0px;" :rules="mulRules.name" :prop="'modules.' + index + '.name'">
                            <el-input label="名称" prop="name" v-model="module.name" placeholder="请输入微服务英文名称，同一个分组内必须唯一"></el-input>
                          </el-form-item>
                        </td>
                      </tr>
                      <tr>
                        <td><label for="describe">描述:</label></td>
                        <td>
                          <el-form-item style="margin: 0px 0px;" :rules="mulRules.describe" :prop="'modules.' + index + '.describe'">
                            <el-input label="描述" prop="describe" v-model="module.describe" placeholder="请输入微服务的中文名称"></el-input>
                          </el-form-item>
                        </td>
                      </tr>
                      <tr>
                        <td><label for="artifactsPaths">产物:</label></td>
                        <td>
                          <el-form-item style="margin: 0px 0px;" :rules="mulRules.artifactsPaths" :prop="'modules.' + index + '.artifactsPaths'">
                            <el-input label="产物" prop="artifactsPaths" v-model="module.artifactsPaths" placeholder="请输入jar包路径，从根目录开始，例如target/demo.jar"></el-input>
                          </el-form-item>
                        </td>
                      </tr>
                      <tr>
                        <td><label for="port">端口:</label></td>
                        <td>
                          <el-form-item style="margin: 0px 0px;" :rules="mulRules.port" :prop="'modules.' + index + '.port'">
                            <el-input label="端口" prop="port" v-model="module.port" placeholder="请输入微服务端口，对应spring-boot的server.port配置"></el-input>
                          </el-form-item>
                        </td>
                      </tr>
                      <tr>
                        <td><label for="prefix">路径前缀:</label></td>
                        <td>
                          <el-form-item style="margin: 0px 0px;" :rules="mulRules.prefix" :key="module.key" :prop="'modules.' + index + '.prefix'" value="/actuator/health">
                            <el-input label="路径前缀" prop="prefix" v-model="module.prefix" placeholder="请输入server.servlet.context-path的路径，即全局统一的访问路径前缀" @blur="autocompletehealth($event)" value="/actuator/health"></el-input>
                          </el-form-item>
                        </td>
                      </tr>
                      <tr>
                        <td><label for="health">健康检查路径:</label></td>
                        <td>
                          <el-form-item style="margin: 0px 0px;" :rules="mulRules.health" :key="module.key" :prop="'modules.' + index + '.health'">
                            <el-input label="健康检查路径" prop="health" v-model="module.health" placeholder="请输入不包含server.servlet.context-path的路径，例如/actuator/health" @blur="autocompletehealth($event)"></el-input>
                          </el-form-item>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-drawer>
      <el-drawer :visible.sync="drawernpm" :with-header="false" size='50%'>
        <div style="padding: 4% 10%;">
          <el-form ref="formNpm" :rules="rules" :model="formNpm" size="small">
            <el-form-item label="分组" prop="namespace">
              <el-input v-model="formNpm.namespace" placeholder="请输入分组名，由管理员分配"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="formNpm.name" placeholder="请输入微服务英文名称，同一个分组内必须唯一"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describe">
              <el-input v-model="formNpm.describe" placeholder="请输入微服务的中文名称"></el-input>
            </el-form-item>
            <el-form-item label="Git地址" prop="gitUrl">
              <el-input v-model="formNpm.gitUrl" placeholder="请输入gitlab仓库地址（拉取代码的url,通常已.git结尾）"></el-input>
            </el-form-item>
            <el-form-item label="分支名/Tag" prop="onlyRefs">
              <el-input v-model="formNpm.onlyRefs" placeholder="测试环境请输入测试主分支，生产环境请输入'tags'"></el-input>
            </el-form-item>
            <el-form-item label="前缀路径" prop="prefix">
              <el-input v-model="formNpm.prefix" placeholder="请输入全局路径前缀，例如/foo/index.html，foo访问前缀，这里输入/foo" @blur="autocompletehealth($event)"></el-input>
            </el-form-item>
            <el-form-item label="健康检查路径" prop="health">
              <el-input v-model="formNpm.health" placeholder="请输入一个能访问的静态资源，例如/index.html" @blur="autocompletehealth($event)"></el-input>
            </el-form-item>
            <el-form-item>
              <span>
                <font style="font-size: 12px;color: red;">获取配置文件后，解压到项目的根目录，一起提交。</font>
              </span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitFormNpm('formNpm')">获取配置文件</el-button>
              <el-button @click="resetFormNpm('formNpm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
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
      <el-table :data="tableData" :height="autoheight">
        <el-table-column fixed prop="namespace" label="Namespace" sortable=true width=100> </el-table-column>
        <el-table-column fixed prop="name" label="名称" width=120> </el-table-column>
        <el-table-column prop="description" label="说明" width=200> </el-table-column>
        <el-table-column prop="kind" label="负载类型" width=100> </el-table-column>
        <el-table-column prop="podStatus" :formatter="podStatusFormatter" label="状态" width=100> </el-table-column>
        <el-table-column prop="podNames" :formatter="podNamesFormatter" label="下辖Pod" width=250> </el-table-column>
        <el-table-column prop="startTime" :formatter="startTimeFormatter" label="启动时间" width=200> </el-table-column>
        <el-table-column prop="duration" :formatter="durationFormatter" label="存活时间（秒）" width=200> </el-table-column>
        <el-table-column prop="restartTimes" :formatter="restartTimesFormatter" label="重启次数" width=100> </el-table-column>
        <el-table-column prop="innerUrl" label="内部调用地址" width=300> </el-table-column>
        <el-table-column prop="gatewayUrl" label="外部调用地址" width=400> </el-table-column>
        <el-table-column prop="gitUrl" label="仓库地址" width=400> </el-table-column>
        <el-table-column prop="replicas" label="要求副本数" width=100> </el-table-column>
        <el-table-column prop="ready" label="正常运行副本数" width=150> </el-table-column>
        <el-table-column fixed="right" label="操作" width=130>
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="重启" placement="bottom">
              <el-button type="primary" icon="el-icon-refresh" size="mini" circle @click="restartClick(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="回滚" placement="bottom">
              <el-button type="primary" icon="el-icon-d-arrow-left" size="mini" circle @click="rollbackClick(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="详情" placement="bottom">
              <el-button type="primary" icon="el-icon-info" size="mini" circle @click="infoClick(scope.row)"></el-button>
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
      // var i = /^[A-Z]+$/g.test(value)
      // var ii = /^[A-Z]+$/g.exec(value)
      // alert(i+"------"+ii)
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 15) {
        return callback(new Error('长度不能超过15'));
      } else if (!(/[a-z0-9]([-a-z0-9]*[a-z0-9])?(.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/g.test(value)) || /[A-Z]/g.test(value)) {
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
      } else if (!(/[a-z0-9]([-a-z0-9]*[a-z0-9])?(.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/g.test(value)) || /[A-Z]/g.test(value)) {
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
      formJava: {
        namespace: "",
        name: "",
        describe: "",
        gitUrl: "",
        onlyRefs: "",
        artifactsPaths: "",
        port: "",
        prefix: "",
        health: "/actuator/health"
      },
      formJavaMul: {
        namespace: "",
        onlyRefs: "",
        gitUrl: "",
        modules: [{
          name: "",
          describe: "",
          artifactsPaths: "",
          port: "",
          prefix: "",
          health: "/actuator/health"
        }]
      },
      formNpm: {
        namespace: "",
        name: "",
        describe: "",
        gitUrl: "",
        onlyRefs: "",
        prefix: "",
        health: "/index.html"
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
      },
      mulRules: {
        name: [{
          validator: name,
          trigger: 'blur'
        }],
        describe: [{
          validator: describe,
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
      },
      autoheight: 0,
    }
  },
  created() {
    this.getServiceList()
    this.autoheight = window.innerHeight - 150
    // this.timer = window.setInterval(() => {
    //   setTimeout(() => {
    //     this.getServiceList()
    //   }, 0)
    // }, 5000)
  },
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight - 150) + 'px'; //自定义高度需求
    }
  },
  methods: {
    getServiceList() {
      axios
        .get(this.global.apiUrl + 'services', {
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
        .post(this.global.apiUrl + 'services', JSON.stringify({
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
        .post(this.global.apiUrl + 'services', JSON.stringify({
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
          if(this.formJava.prefix != "" && this.formJava.prefix.substr(0, 1) != "/" ){
            this.formJava.prefix = "/"+this.formJava.prefix
          }
          if(this.formJava.health != "" && this.formJava.health.substr(0, 1) != "/" ){
            this.formJava.health = "/"+this.formJava.health
          }
          axios
            .put(this.global.apiUrl + 'services?action=java',
              JSON.stringify(this.formJava))
            .then(res => {
              if (res.data == "success") {
                this.$message({
                  showClose: true,
                  message: '创建成功',
                  type: 'success'
                });
                window.open(this.global.apiUrl + "ci.zip");
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
    resetFormJava(formName) {
      this.$refs[formName].resetFields();
    },
    submitFormJavaMul(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.formJavaMul.modules.forEach(function(element){
            if(element.prefix != "" && element.prefix.substr(0, 1) != "/" ){
              element.prefix = "/"+element.prefix
            }
            if(element.health != "" && element.health.substr(0, 1) != "/" ){
              element.health = "/"+element.health
            }
          })
          axios
            .put(this.global.apiUrl + 'services?action=javaMul', JSON.stringify(this.formJavaMul))
            .then(res => {
              if (res.data == "success") {
                this.$message({
                  showClose: true,
                  message: '创建成功',
                  type: 'success'
                });
                window.open(this.global.apiUrl + "ci.zip");
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
    resetFormJavaMul(formName) {
      this.$refs[formName].resetFields();
    },
    removeService(item) {
      var index = this.formJavaMul.modules.indexOf(item)
      if (index !== -1) {
        this.formJavaMul.modules.splice(index, 1)
      }
    },
    addService() {
      this.formJavaMul.modules.push({
        value: '',
        key: Date.now(),
        health: "/actuator/health"
      });
    },
    submitFormNpm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if(this.formNpm.prefix != "" && this.formNpm.prefix.substr(0, 1) != "/" ){
            this.formNpm.prefix = "/"+this.formNpm.prefix
          }
          if(this.formNpm.health != "" && this.formNpm.health.substr(0, 1) != "/" ){
            this.formNpm.health = "/"+this.formNpm.health
          }
          axios
            .put(this.global.apiUrl + 'services?action=npm', JSON.stringify(this.formNpm))
            .then(res => {
              if (res.data == "success") {
                this.$message({
                  showClose: true,
                  message: '创建成功',
                  type: 'success'
                });
                window.open(this.global.apiUrl + "ci.zip");
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
    resetFormNpm(formName) {
      this.$refs[formName].resetFields();
    },
    autocompletehealth(event) {
      let value = event.target.value
      if (value == "") {
        return
      } else if (value.substr(0, 1) != "/") {
        event.target.value = "/" + value
      }
      console.log(this.formJava)
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

.input {
  width: 100%;
}

.td1 {
  width: 20%;
}

.td2 {
  width: 80%;
}
</style>
