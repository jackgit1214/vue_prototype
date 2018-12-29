<template>
  <el-tree
    :data="storeRoomTreeData"
    @node-click="nodeClick"
    :default-expanded-keys="defaultExpandKeys"
    :expand-on-click-node="true"
    node-key="depotId"
    :load="treeLoad"
    lazy
    ref="storeroomtree"
    :highlight-current="true"
    :props="defaultProps"
  ></el-tree>
</template>

<script>
import DataUtility from "@/common/datautilitytools.js";
export default {
  name: "storeroom-tree",
  mixins: [DataUtility], //混入工具类
  data() {
    return {
      depotRootSuperId: "ABC",
      depotRootKey: "000",
      storeRoomTreeData: null,
      defaultProps: {
        id: "depotId",
        label: "depotName",
        isLeaf: function(data, node) {
          if (data.endflag == null || data.endflag == "1") return true;
          else return false;
        }
      },
      defaultExpandKeys: []
    };
  },
  mounted() {
    let $this = this;
    this.queryData(
      "/public/test/getDepotdata",
      { id: $this.depotRootSuperId },
      function(resData) {
        $this.storeRoomTreeData = resData;
      }
    );

    this.$refs.storeroomtree.store.defaultExpandedKeys = this.depotRootKey;
  },
  updated: function() {
    //数据变更之后
    // this.$refs.storeroomtree.setCurrentKey(this.depotRootKey);
    // var node = this.$refs.storeroomtree.getCurrentNode();
    // this.$emit("node-click", node);
  },
  methods: {
    nodeClick(data, node, vuenode) {
      this.$emit("node-click", data);
    },

    treeLoad(node, resolve) {
      if (node.data == null) return;

      this.queryData(
        "/public/test/getDepotdata",
        { id: node.data.depotId },
        function(resData) {
          resolve(resData);
        }
      );
    },
    deleteNode(nodeData) {
      let delNode = this.$refs.storeroomtree.getNode(nodeData.depotId);
      this.$refs.storeroomtree.remove(delNode);
    },
    addNode(nodeData) {
      let parentNode = this.$refs.storeroomtree.getNode(this.getCurrentNode());
      parentNode.isLeaf = false;
      if (!parentNode.children) {
        this.$set(parentNode, "children", []);
      }
      parentNode.children.push(val);
      //this.$refs.storeroomtree.append(nodeData, parentNode);
    },
    getCurrentNode() {
      return this.$refs.storeroomtree.getCurrentNode();
    }
  }
};
</script>
