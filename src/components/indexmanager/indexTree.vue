<template>
<el-tree :data="indexTreeData" @node-click="nodeClick"  :default-expanded-keys="defaultExpandKeys" :expand-on-click-node=true node-key="id" ref="indexTree" highlight-current :props="defaultProps">
</el-tree>
</template>

<script>
import * as demoData from "./data.js";
export default {
  name: "index-tree",

  data() {
    return {
      indexTreeData: demoData.indexTreeDatas,
      defaultProps: {
        children: "children",
        label: "label"
      },
      defaultExpandKeys: [1]
    };
  },
  mounted() {
    this.$refs.indexTree.setCurrentKey("A");
    var node = this.$refs.indexTree.getCurrentNode();
    this.$emit("node-click", node);
  },
  methods: {
    nodeClick(node) {
      this.$emit("node-click", node);
    }
  }
};
</script>
