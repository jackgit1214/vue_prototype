<template>
<el-tree :data="codeTreeData" @node-click="nodeClick"  :default-expanded-keys="defaultExpandKeys" :expand-on-click-node=true node-key="codeid" ref="codeTree" highlight-current :props="defaultProps">
</el-tree>
</template>

<script>
import * as demoData from "./data.js";
export default {
  name: "code-tree",

  data() {
    return {
      codeTreeData: demoData.codeTreeDatas,
      defaultProps: {
        children: "children",
        label: "CODENAME"
      },
      defaultExpandKeys: ["all"]
    };
  },
  mounted() {
    this.$refs.codeTree.setCurrentKey("11");
    var node = this.$refs.codeTree.getCurrentNode();
    this.$emit("node-click", node);
  },
  methods: {
    nodeClick(node) {
      this.$emit("node-click", node);
    }
  }
};
</script>
