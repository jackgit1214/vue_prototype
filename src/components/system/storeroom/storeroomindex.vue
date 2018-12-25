<template>
  <el-container>
    <el-aside width="200px">
      <storeRoomTree @node-click="nodeclick" ref="storeRoomTree"/>
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
            ref="testCom"
          />
        </el-form>
      </div>
      <div class="block">
        <el-table
          ref="depotDatas"
          :data="storeroomDatas|pageFilters(page.size,page.curpage,page)"
          border
          :height="$store.state.sys.screen.DataHeight"
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
            @size-change="pageChange"
            @current-change="handleCurrentChange"
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
import store, { depotRootSuperId, depotRootKey } from "./data.js";
export default {
  name: "page",
  components: {
    editInfo,
    storeRoomTree
  },
  data() {
    return {
      editData: {
        type: Object
      },

      curWidth: 500,
      isEdit: false,
      showDialog: false,
      page: {
        size: 5,
        curpage: 1,
        total: 5
      },
      storeroomDatas: []
    };
  },
  watch: {
    //editData(newVal, oldVal) {}
  },
  mounted() {},
  updated() {},

  methods: {
    findData() {
      //如果实时触发查询条件，需要在input中使用v-model
      //
    },
    sortData() {},
    pageChange(val) {
      this.page.size = val;
    },
    handleCurrentChange(val) {
      this.page.curpage = val;
    },
    addData() {
      let addData = {
        depotId: "",
        depotCode: "",
        depotName: "",
        dutyMan: "",
        note: ""
      };
      this.editData = JSON.parse(JSON.stringify(addData));
      this.isEdit = 2;
      this.showDialog = true;
    },

    handleEdit(index, curData, isEdit) {
      this.editData = JSON.parse(JSON.stringify(curData));
      this.isEdit = isEdit;
      this.showDialog = true;
    },
    handleDelete(index, curData) {
      let delIndex = this.storeroomDatas.findIndex(function(element) {
        return element.depotId == curData.depotId;
      });
      let $this = this;
      this.$confirm("是否确定删除？", "警告", {
        type: "error"
      })
        .then(mes => {
          store.deleteData(curData.depotId, function() {
            $this.$delete($this.storeroomDatas, delIndex);
            $this.$refs.storeRoomTree.deleteNode(curData);
            $this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
              duration: 1000
            });
          });
        })
        .catch(error => {});
    },
    dataSubmit(val) {},
    nodeclick(node) {
      let $this = this;
      store.getDepotdata(node.data, function(resData) {
        $this.storeroomDatas = resData;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding-top: 1px;
  padding-left: 5px;
  padding-right: 5px;
}

.el-header {
  padding-right: 5px;
  padding-left: 5px;
}

.el-switch {
  padding-top: 0px;
}
</style>
