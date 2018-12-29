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
    :filter-node-method="filterNode"
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
    this.$refs.storeroomtree.setCurrentKey(this.depotRootKey); //选中根
    var node = this.$refs.storeroomtree.getCurrentNode();
    this.$emit("node-click", node);
  },
  methods: {
    nodeClick(data, node, vuenode) {
      this.$emit("node-click", data);
    },
    filterNode(value, data, node) {
      //树的查询必须是展开所有时才起作用。
      //node.expand();
      if (!value) return true;
      return data.depotName.indexOf(value) !== -1;
    },
    findNode(val) {
      let allKeys = this.$refs.storeroomtree.store.nodesMap;
      //childNodes
      //console.log(allNodes);
      for (let key in allKeys) {
        let node = this.$refs.storeroomtree.getNode(key);
        node.expand();
      }
      //this.$refs.storeroomtree.filter(val);
    },
    treeLoad(node, resolve) {
      if (node.data == null) return;
      this.queryData(
        "/public/test/getDepotdata",
        { id: node.data.depotId },
        function(resData) {
          node.children = resData;
          if (resData.length > 0) node.data.isLeaf = true;
          resolve(resData);
        }
      );
    },
    deleteNode(nodeData) {
      let delNode = this.$refs.storeroomtree.getNode(nodeData.depotId);
      this.$refs.storeroomtree.remove(delNode);
    },

    testNode() {
      //let parentNode = this.$refs.storeroomtree.getNode("000000");
      //parentNode.data.depotName = "test";
      //parentNode.expand();
    },
    updateNode(nodeData) {
      let parentNode = this.$refs.storeroomtree.getNode(this.getCurrentNode());
      if (!parentNode.children) {
        this.$set(parentNode, "children", []);
      }
      let isEditNode = this.$refs.storeroomtree.getNode(nodeData.depotId);
      console.log(isEditNode);
      parentNode.children.push(nodeData);
      if (parentNode.loaded) {
        //已经懒加载，需要手动添加
        if (isEditNode) {
          //let curnode = this.$refs.storeroomtree.getNode(nodeData);
          isEditNode.data = nodeData;
        } else {
          this.$refs.storeroomtree.append(nodeData, parentNode);
        }
      } else {
        parentNode.isLeaf = false;
      }
    },
    getCurrentNode() {
      return this.$refs.storeroomtree.getCurrentNode();
    }
  }
};
</script>
