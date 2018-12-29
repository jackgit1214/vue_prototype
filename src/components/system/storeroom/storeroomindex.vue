<template>
  <el-container>
    <el-aside width="200px" :style="{height:$store.state.sys.screen.DataHeight+'px'}">
      <el-scrollbar style="height:100%;">
        <storeRoomTree @node-click="nodeclick" ref="storeRoomTree"/>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <div class="block">
        <el-form :inline="true">
          <el-form-item label="库房名称：">
            <el-input size="small" ref="depotName" clearable placeholder="库房名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="small" @click="findData">查询</el-button>
            <el-button type="small" @click="addData">新增</el-button>
          </el-form-item>
          <edit-info
            @close-dialog="dataSubmit"
            :isEdit="isEdit"
            :depotData="editData"
            v-if="editData"
            v-model="showDialog"
            ref="storeRoomEdit"
          />
        </el-form>
      </div>
      <div class="block">
        <el-table
          ref="depotDatas"
          :data="listTableData"
          border
          :height="$store.state.sys.screen.DataHeight - 80"
          stripe
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="depotCode" label="库房代码" width="90"></el-table-column>
          <el-table-column prop="depotName" label="库房名称" width="160"></el-table-column>
          <el-table-column prop="dutyMan" label="责任人" width="100"></el-table-column>
          <el-table-column show-overflow-tooltip prop="note" label="备注"></el-table-column>

          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.$index, scope.row,0)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row,1)">编辑</el-button>
              <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            ref="pagebar"
            background
            :pager-count="5"
            @size-change="pageSizeChange"
            @current-change="pageChange"
            :current-page="0"
            :page-sizes="[5, 10, 15, 9999]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          ></el-pagination>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import editInfo from "./storeroomedit.vue";
import storeRoomTree from "./storeroomtree.vue";
import { uuidUtils } from "@/common/common.js";
import DataUtility from "@/common/datautilitytools.js";

export default {
  mixins: [DataUtility], //混入工具类
  name: "page",
  components: {
    editInfo,
    storeRoomTree
  },
  data() {
    return {
      depotRootSuperId: "ABC",
      depotRootKey: "000",
      editData: {
        type: Object
      },
      isEdit: false,
      showDialog: false
    };
  },
  watch: {
    //editData(newVal, oldVal) {}
  },
  mounted() {
    // console.log("===================000000000000000000000====================");
  },
  updated() {},

  methods: {
    findData() {
      let fintDeptName = this.$refs.depotName.currentValue;
      this.$refs.storeRoomTree.findNode(fintDeptName);
      //this.$refs.storeRoomTree.testNode();
      //如果实时触发查询条件，需要在input中使用v-model
      //
    },
    sortData() {},

    addData() {
      let addData = {
        depotId: "",
        depotCode: "",
        depotName: "",
        superId: "",
        endflag: "1",
        superDepot: null,
        dutyMan: "",
        note: ""
      };
      let curNode = this.$refs.storeRoomTree.getCurrentNode();
      addData.superDepot = curNode;
      this.editData = JSON.parse(JSON.stringify(addData));
      this.isEdit = 2;
      this.showDialog = true;
    },

    handleEdit(index, curData, isEdit) {
      this.editData = JSON.parse(JSON.stringify(curData));
      this.editData.superDepot = this.$refs.storeRoomTree.getCurrentNode();
      this.isEdit = isEdit;
      this.showDialog = true;
    },
    handleDelete(index, curData) {
      let $this = this;
      this.removeData("/public/test/deleteDepot", curData.depotId, function() {
        $this.$refs.storeRoomTree.deleteNode(curData);
      });
    },
    dataSubmit(val) {
      let $this = this;
      this.updateData("/public/test/update", val, function(rtnData) {
        val.depotId = rtnData.depotId;
        $this.$refs.storeRoomTree.updateNode(val);
      });
    },
    nodeclick(node) {
      let params = {
        param: {
          superid: node.data + "," //逗号表示是否模糊查询
        }
      };
      this.initListTable("/public/test/depotDataByPage", params);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
