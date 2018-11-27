<template>
  <el-dialog
    @open="openDialog"
    @close="closeDialog"
    ref="dailog"
    title="信息编辑"
    v-draggable
    :visible.sync="showDialog"
    width="450px"
    modal
    :before-close="handleClose"
  >
    <el-form
      ref="indexData"
      :disabled="!isEdit"
      label-width="100px"
      :model="indexData"
      width="400px"
      label-position="right"
    >
      <el-form-item label="指标代码：">
        <el-input size="small" v-model="indexData.INDEXID" v-bind:disabled="isAdd" placeholder="代码"></el-input>
      </el-form-item>
      <el-form-item label="指标名称：">
        <el-input size="small" v-model="indexData.INDEXNAME" placeholder="指标名称"></el-input>
      </el-form-item>
      <el-form-item label="数据类型：">
        <el-select v-model="indexData.IDATATYPE" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上级代码：">
        <el-input size="small" :disabled="true" v-model="indexData.SUPERID"></el-input>
      </el-form-item>
      <el-form-item label="是否核心：">
        <el-switch
          style="display: block"
          v-model="indexData.ISCORE"
          active-text="是"
          inactive-text="否"
          active-value="1"
          inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item label="摘要：">
        <el-input type="textarea" v-model="indexData.BREVIARY" placeholder="摘要"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="info" @click="handleClose">关 闭</el-button>
      <el-button type="primary" v-if="isEdit" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {},
    indexData: {
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
      this.$emit("close-dialog", this.indexData);
      this.showDialog = false;
    },
    openDialog() {
      if (this.isEdit == 2) this.isAdd = false;
      else {
        this.isAdd = true;
      }
      //记录原数据值
      this.oriData = JSON.parse(JSON.stringify(this.indexData));
      //由于打开后，数据绑定完成，此时将是否更改，修改为false
      this.isChanged = false;
      console.log("opendialog.......................");
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
    indexData: {
      handler(newVal, oldVal) {
        var $this = this;
        console.log(
          "HANDLER......................." + $this.oriData["INDEXID"]
        );
        for (let i in $this.oriData) {
          if (newVal[i] != $this.oriData[i]) {
            console.log("handler   for .....");
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
/* 指标的样式*/

.el-input,
.el-textarea {
  width: 280px;
}
</style>
