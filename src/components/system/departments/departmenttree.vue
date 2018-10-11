<template>
<el-tree :data="departmentTreeData" @node-click="nodeClick"  :default-expanded-keys="defaultExpandKeys"
 :expand-on-click-node=true node-key="DEPTID" ref="departmentTree" highlight-current :props="defaultProps">
</el-tree>
</template>

<script>
import * as demoData from "./data.js";
export default {
  name: "department-tree",

  data() {
    return {
      departmentTreeData: demoData.treeData,
      defaultProps: {
        children: "children",
        label: "DEPT_NAME"
      },
      defaultExpandKeys: ["root"]
    };
  },
  mounted() {
    let tmpdata = demoData.departmentDatas.filter(function(value) {
      return value.SUPERID == "root";
    });
    this.departmentTreeData[0].children = tmpdata;
    this.$refs.departmentTree.setCurrentKey("root");
    var node = this.$refs.departmentTree.getCurrentNode();
    this.$emit("node-click", node);
  },
  methods: {
    nodeClick(node) {
      this.$emit("node-click", node);
    },
    getCurrentNode() {
      return this.$refs.departmentTree.getCurrentNode();
    }
  }
};
</script>
