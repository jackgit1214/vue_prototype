<template>
  <div class="depotStyle">
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
      <el-form
        ref="depotData"
        :inline="true"
        :disabled="!isEdit"
        label-width="90px"
        :model="depotData"
        width="380px"
        label-position="right"
      >
        <!---->
        <input type="hidden" v-model="depotData.depotId">
        <el-row :gutter="5">
          <el-col :span="12">
            <div>
              <el-form-item
                label="库房代码："
                prop="depotCode"
                :rules="[{required:true,message:'库房代码不能为空',trigger:'blue'},{min: 6,max: 15,message: '长度在6到15个字符',trigger: 'blur' }]"
              >
                <el-input
                  size="small"
                  v-model="depotData.depotCode"
                  v-bind:disabled="isAdd"
                  placeholder="库房代码"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item
                label="库房名称："
                prop="depotName"
                :rules="[{required:true,message:'库房名称不能为空'}, {max: 30,message: '长度介于1到30个字符',trigger: 'blur' }]"
              >
                <el-input size="small" v-model="depotData.depotName" placeholder="库房名称"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="12">
            <div>
              <el-form-item label="责任人：">
                <el-input size="small" v-model="depotData.dutyMan" placeholder="责任人"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <el-form-item label="上级名称：">
                <el-input size="small" v-model="depotData.superid" placeholder="上级名称"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="24">
            <div>
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="depotData.note" placeholder="备注"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
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
  name: "storeroom-edit",
  props: {
    value: {},
    depotData: {
      type: Object
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
      }
    };
  },
  computed: {},
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
    handleChange(value, direction, movedKeys) {
      //value 右则列表值
      // movedkeys 当前移动的值
      console.log(value, direction, movedKeys);
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

      this.$emit("close-dialog", this.userData);
      this.showDialog = false;
    },
    openDialog() {
      if (this.isEdit == 2) this.isAdd = false;
      else {
        this.isAdd = true;
      }
      //记录原数据值
      this.oriData = JSON.parse(JSON.stringify(this.depotData));
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
.depotStyle {
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
.el-transfer /deep/ .el-transfer-panel {
  width: 180px !important;
  .el-transfer-panel__body {
    height: 210px !important;
  }
  .el-transfer-panel__list {
    height: 200px !important;
  }
}
</style>


