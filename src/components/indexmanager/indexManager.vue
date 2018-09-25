<template>
<el-main>
  <div class="block">
     <el-form :inline="true" >
      <el-form-item label="指标代码：">
        <el-input size="small" ref="indexid" clearable placeholder="代码"></el-input>
      </el-form-item>
      <el-form-item label="指标名称：">
        <el-input size="small"  clearable ref="indexname"  placeholder="指标名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="small" @click="findData">查询</el-button>
        <el-button type="small" @click="addData">新增</el-button>
        <el-button type="small" @click="goTest">go</el-button>
      </el-form-item>
      <edit-info @close-dialog="dataSubmit" :isEdit="isEdit" :options="options" :index-data="editData" v-if="editData" v-model="showDialog" ref="testCom" />
    </el-form>
  </div>
  <el-container>
    <el-aside width="200px">
      <index-tree @node-click="nodeclick" />
    </el-aside>
    <el-main>
      <el-table ref="singleTable" :data="indexDatas|indexFilter(filterIndexData,queryInfo)|pageFilter(page.size,page.curpage,page)" border :height="$store.state.sys.screen.DataHeight" stripe highlight-current-row style="width: 100%">

        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column prop="INDEXID" label="指标ID" width="80">

        </el-table-column>
        <el-table-column prop="INDEXNAME" header-align="center" label="指标名称" width="150">
        </el-table-column>
        <el-table-column label="数据类型" width="100">
          <template slot-scope="scope">
            <span>{{formateOption(scope.row.IDATATYPE)}}</span>
          </template>

        </el-table-column>
        <el-table-column prop="SUPERID" label="上级指标" width="80">
        </el-table-column>
        <el-table-column label="是否核心" width="80">
          <template slot-scope="scope">
            <el-switch style="display: block" disabled v-model="scope.row.ISCORE" active-value="1" inactive-value="0">
            </el-switch>
          </template>

        </el-table-column>
        <el-table-column prop="BREVIARY" show-overflow-tooltip label="摘要">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row,0)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row,1)">编辑</el-button>
            <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination ref="pagebar" background :pager-count="5" @size-change="pageChange" @current-change="handleCurrentChange" :current-page="0" :page-sizes="[5, 10, 15, 9999]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="page.total"></el-pagination>
      </div>
    </el-main>

  </el-container>

</el-main>
</template>

<script>
import editInfo from "./edit.vue";
import indexTree from "./indexTree.vue";
import listTable from "../pagecomponents/showComponent/tableList";
import * as demoData from "./data.js";
export default {
  name: "page",
  components: {
    editInfo,
    indexTree,
    listTable
  },
  data() {
    return {
      editData: {
        type: Object
      },
      queryInfo: {
        indexId: "",
        indexName: ""
      },
      columnProp: [
        { label: "test2", prop: "test2", width: "80" },
        { label: "test3", prop: "test3", width: "80" }
      ],
      testData: [
        {
          test2: "11",
          test3: "22"
        },
        {
          test2: "33",
          test3: "44"
        }
      ],
      filterIndexData: "",
      curWidth: 500,
      isEdit: false,
      showDialog: false,
      curEditIndex: 0,
      page: {
        size: 5,
        curpage: 1,
        total: 5
      },
      options: demoData.dataTypes,
      indexDatas: demoData.indexDatas
    };
  },
  watch: {
    //editData(newVal, oldVal) {}
  },
  mounted() {},
  updated() {},
  filters: {
    indexFilter: function(values, obj, queryInfo) {
      let newValues = values.filter(function(value) {
        let newV = value.INDEXID != obj && value.INDEXID.startsWith(obj);
        if (queryInfo.indexId.trim() != "")
          newV = newV && value.INDEXID == queryInfo.indexId;

        if (queryInfo.indexName.trim() != "") {
          newV = newV && value.INDEXNAME.includes(queryInfo.indexName);
        }
        return newV;
      });
      return newValues;
    },
    pageFilter: function(values, pageSize, curPage, page) {
      page.total = values.length; //初始总行数
      let startRow = 0;
      let endRow = 0;
      if (curPage > 1) startRow = (curPage - 1) * pageSize - 1;
      endRow = startRow + pageSize;
      return values.slice(startRow, endRow);
    }
  },
  methods: {
    findData() {
      //如果实时触发查询条件，需要在input中使用v-model
      this.queryInfo.indexId = this.$refs.indexid.currentValue;
      this.queryInfo.indexName = this.$refs.indexname.currentValue;
      this.filterIndexData = "";
    },
    sortData() {
      this.indexDatas.sort(function(obj1, obj2) {
        var nameA = obj1.INDEXID.toUpperCase();
        var nameB = obj2.INDEXID.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    },
    pageChange(val) {
      this.page.size = val;
    },
    handleCurrentChange(val) {
      this.page.curpage = val;
    },
    goTest() {
      console.log(this.$router);
      this.$router.push({ path: "/code" });
    },
    addData() {
      let addData = {
        INDEXID: "",
        INDEXNAME: "",
        IDATATYPE: "",
        SUPERID: this.filterIndexData,
        ISCORE: "",
        BREVIARY: ""
      };
      this.editData = JSON.parse(JSON.stringify(addData));
      this.curEditIndex = this.indexDatas.length + 1;
      this.isEdit = 2;
      this.showDialog = true;
    },
    formateOption(val) {
      let rtnOpt = this.options.filter(function(option) {
        return option.value === val;
      });
      if (rtnOpt.length > 0) return rtnOpt[0].label;
      else return "";
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleEdit(index, curData, isEdit) {
      this.editData = JSON.parse(JSON.stringify(curData));
      if (this.page.curpage == 1) this.curEditIndex = index + 1;
      else this.curEditIndex = (this.page.curpage - 1) * this.page.size + index;
      this.isEdit = isEdit;
      this.showDialog = true;
    },
    handleDelete(index, curData) {
      let delIndex = this.indexDatas.findIndex(function(element) {
        return element.INDEXID == curData.INDEXID;
      });
      this.$delete(this.indexDatas, delIndex);
    },
    dataSubmit(val) {
      // 新增，直接添加
      if (this.isEdit == 2) {
        this.indexDatas.push(val);
        this.sortData();
      }

      //修改，查找元素
      if (this.isEdit == 1) {
        this.$set(this.indexDatas, this.curEditIndex, val);
      }
    },
    nodeclick(node) {
      this.filterIndexData = node.id;
      let obj = node.id;
      this.page.total = this.indexDatas.filter(
        value => value.INDEXID != obj && value.INDEXID.startsWith(obj)
      ).length;
      this.page.curpage = 1;
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");
    // called when the route that renders this component has changed,
    // but this component is reused in the new route.
    // For example, for a route with dynamic params `/foo/:id`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused, and this hook will be called when that happens.
    // has access to `this` component instance.
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave");
    next();
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
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
