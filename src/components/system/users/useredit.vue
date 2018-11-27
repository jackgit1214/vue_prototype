<template>
  <div class="userStyle">
    <el-dialog
      @open="openDialog"
      @close="closeDialog"
      ref="dailog"
      title="信息编辑"
      v-draggable
      :visible.sync="showDialog"
      width="625px"
      modal
      :before-close="handleClose"
    >
      <el-tabs :tab-position="tabPosition" style="height: 300px;">
        <el-tab-pane label="用户信息">
          <el-form
            ref="userData"
            :inline="true"
            :disabled="!isEdit"
            label-width="90px"
            :model="userData"
            width="380px"
            label-position="right"
          >
            <input type="hidden" v-model="userData.USERID">
            <el-row :gutter="5">
              <el-col :span="12">
                <div>
                  <el-form-item
                    label="登录名："
                    prop="LOGINCODE"
                    :rules="[{required:true,message:'登录名不能为空',trigger:'blue'},{min: 6,
            max: 15,message: '长度在6到15个字符',trigger: 'blur' }]"
                  >
                    <el-input
                      size="small"
                      v-model="userData.LOGINCODE"
                      v-bind:disabled="isAdd"
                      placeholder="登录名"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <el-form-item
                    label="姓名："
                    prop="username"
                    :rules="[{required:true,message:'姓名不能为空'}, {
            max: 30,message: '长度介于1到30个字符',trigger: 'blur' }]"
                  >
                    <el-input size="small" v-model="userData.username" placeholder="姓名"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <div>
                  <el-form-item label="性别：">
                    <el-switch
                      style="display: block"
                      v-model="userData.gender"
                      :active-value="1"
                      :inactive-value="0"
                    ></el-switch>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <el-form-item label="电话：">
                    <el-input size="small" v-model="userData.phone" placeholder="电话"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="12">
                <div>
                  <el-form-item label="出生日期：">
                    <el-date-picker
                      v-model="userData.birthday"
                      align="left"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="datepickerOption"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <el-form-item label="年龄：">
                    <el-input size="small" :disabled="true" :value="personAge"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="5">
              <el-col :span="12">
                <div>
                  <el-form-item
                    label="email："
                    prop="email"
                    :rules="[ { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]"
                  >
                    <el-input size="small" v-model="userData.email"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <el-form-item label="qq：">
                    <el-input size="small" v-model="userData.qq"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="24">
                <div>
                  <el-form-item label="地址：">
                    <el-input type="textarea" v-model="userData.address" placeholder="地址"></el-input>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="所属角色">角色管理</el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="handleClose">关 闭</el-button>
        <el-button type="primary" v-if="isEdit" @click="handleSubmit('userData')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uuidUtils } from "@/common/common.js";

export default {
  props: {
    value: {},
    userData: {
      type: Object
    },
    options: {
      type: Array
    },
    isEdit: 0
  },
  data() {
    return {
      showDialog: false,
      selectValue: "",
      tabPosition: "right",
      isAdd: false,
      isChanged: false,
      oriData: {
        type: Object
      },
      datepickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  computed: {
    personAge: function() {
      let curDate = new Date();
      let birthday = this.userData.birthday;
      if (birthday == undefined || birthday == null || birthday == "")
        return "";
      let age = Math.floor((curDate - birthday) / (24 * 3600 * 1000 * 365));
      this.userData.age = age;
      return age;
    }
  },
  methods: {
    handleClose(done) {
      if (this.isChanged) {
        this.$confirm("数据已修改，是否保存？", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否"
        })
          .then(_ => {
            this.handleSubmit();
          })
          .catch(_ => {
            this.showDialog = false;
          });
      } else {
        this.showDialog = false;
      }
    },
    handleSubmit(done) {
      this.$refs[done].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
      return;
      this.$emit("close-dialog", this.userData);
      this.showDialog = false;
    },
    openDialog() {
      if (this.isEdit == 2) this.isAdd = false;
      else {
        this.isAdd = true;
      }
      //记录原数据值
      this.oriData = JSON.parse(JSON.stringify(this.userData));
      //由于打开后，数据绑定完成，此时将是否更改，修改为false
      this.isChanged = false;
    },
    closeDialog() {
      //console.log("子组件关闭事件！");
      //console.log(uuidUtils);
      // let uuid = uuidUtils.getUUID();
      // console.log(uuid);
      //console.log(uuidUtils.getUUID_NoLine());
      //this.$emit("close-dialog", "cc");
    }
  },
  mounted() {
    this.showDialog = this.value;
  },
  watch: {
    value(newVal, oldVal) {
      this.showDialog = newVal;
    },
    showDialog(val) {
      this.$emit("input", val);
    },
    userData: {
      handler(newVal, oldVal) {
        var $this = this;
        for (let i in $this.oriData) {
          if (newVal[i] != $this.oriData[i]) {
            $this.isChanged = true;
            break;
          } else {
            $this.isChanged = false;
          }
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.userStyle {
  .el-input {
    width: 140px;
  }

  .el-textarea {
    width: 400px;
  }

  .el-date-editor {
    width: 140px !important;
  }
}
</style>

