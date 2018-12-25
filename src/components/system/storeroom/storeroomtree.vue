<template>
  <el-tree
    :data="storeRoomTreeData"
    @node-click="nodeClick"
    :default-expanded-keys="defaultExpandKeys"
    :expand-on-click-node="true"
    node-key="depotId"
    :load="treeLoad"
    lazy
    ref="storeRoomTree"
    :highlight-current="true"
    :props="defaultProps"
  ></el-tree>
</template>

<script>
import $http from "@/common/fetch";
import store, { depotRootSuperId, depotRootKey } from "./data.js";

export default {
  name: "storeroom-tree",

  data() {
    return {
      storeRoomTreeData: null,
      defaultProps: {
        children: "endflag",
        label: "depotName"
      },
      defaultExpandKeys: [depotRootSuperId]
    };
  },
  mounted() {
    let $this = this;
    store.getDepotdata("", function(resData) {
      $this.storeRoomTreeData = resData;
    });

    this.$refs.storeRoomTree.store.defaultExpandedKeys = depotRootKey;
  },
  updated: function() {
    //数据变更之后
    this.$refs.storeRoomTree.setCurrentKey(depotRootKey);
    var node = this.$refs.storeRoomTree.getCurrentNode();
    this.$emit("node-click", node);
  },
  methods: {
    nodeClick(node) {
      this.$emit("node-click", node);
    },

    treeLoad(node, resolve) {
      if (node.data == null) return;
      store.getDepotdata(node.data.data, function(resData) {
        resolve(resData);
      });
    },
    deleteNode(nodeData) {
      let delNode = this.$refs.storeRoomTree.getNode(nodeData.depotId);
      this.$refs.storeRoomTree.remove(delNode);
    },
    getCurrentNode() {
      return this.$refs.storeroomtree.getCurrentNode();
    }
  }
};
</script>
