<template>
<el-dialog @open="openDialog" @close="closeDialog" ref="dailog" title="信息编辑" v-draggable :visible.sync="showDialog"
 width="450px" modal :before-close="handleClose">
  <el-form ref="departmentData" :disabled="!isEdit" label-width="100px" :model="departmentData" width="400px" label-position="right">
     <input type="hidden" v-model="departmentData.SUPERID"/>

   <el-form-item label="部门ID：">
      <el-input size="small" v-model="departmentData.DEPTID" :disabled="isAdd"  placeholder="部门ID"></el-input>
    </el-form-item>  
    <el-form-item label="部门名称：">
      <el-input size="small" v-model="departmentData.DEPT_NAME"  placeholder="部门名称"></el-input>
    </el-form-item>
    <el-form-item label="上级部门：">
      <el-input size="small" v-model="departmentData.superObject.DEPT_NAME" v-if="departmentData.superObject" placeholder="上级部门" disabled=""></el-input>
    </el-form-item>
    
    <el-form-item label="描述：">
      <el-input type="textarea" v-model="departmentData.dept_desc" placeholder="描述"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="info" @click="handleClose">关 闭</el-button>
    <el-button type="primary" v-if="isEdit"  @click="handleSubmit">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  props: {
    value: {},
    departmentData: {
      type: Object
    },
    isEdit: 0
  },
  data() {
    return {
      showDialog: false,
      selectValue: "",
      isAdd: false,
      isChanged: false,
      oriData: {
        type: Object
      }
    };
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
      this.$emit("close-dialog", this.departmentData);
      this.showDialog = false;
    },
    openDialog() {
      if (this.isEdit == 2) this.isAdd = false;
      else {
        this.isAdd = true;
      }
      //记录原数据值
      this.oriData = JSON.parse(JSON.stringify(this.departmentData));
      //由于打开后，数据绑定完成，此时将是否更改，修改为false
      this.isChanged = false;
    },
    closeDialog() {
      //console.log("子组件关闭事件！");
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
    departmentData: {
      handler(newVal, oldVal) {
        var $this = this;
        for (let i in $this.oriData) {
          if (newVal[i] != $this.oriData[i]) {
            // console.log("handler   for .....");
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

<style lang="scss">
.el-form-item {
  margin-bottom: 5px;
}

.el-form-item .el-form-item__label {
  padding-right: 5px;
}

.el-form-item .el-form-item__content {
  margin-left: 0px !important;
}

.el-input,
.el-textarea {
  width: 280px;
}

.el-form {
  padding-left: 10px;
  padding-right: 10px;
}

.el-dialog__body {
  padding: 5px 10px;
}

.el-dialog__footer {
  text-align: center;
  padding: 10px 10px;
}

.el-dialog__header {
  padding: 10px 10px 10px 20px;
}

.el-dialog__headerbtn {
  top: 10px;
}

.el-switch {
  padding-top: 10px;
}
</style>
