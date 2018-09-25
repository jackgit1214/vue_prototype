<template>
<div>
  <el-table :ref="refValue" :data="tableData" border :height="$store.state.sys.screen.DataHeight" stripe highlight-current-row style="width: 100%">

    <el-table-column type="selection" width="50" v-if="showCheckBox">
    </el-table-column>

    <el-table-column v-for="column in columnProps" :key="column.prop"  :prop="column.prop" :label="column.label" :width="column.width">
    </el-table-column>
    
  </el-table>
</div>
</template>

<script>
export default {
  name: "list-table",
  props: {
    refValue: "mytable",
    showCheckBox: true,
    showFunc: false,
    tableData: {
      type: Array
    },
    columnProps: {
      type: Array
    } //存储格式 {label:'',prop:'',width:''}
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
