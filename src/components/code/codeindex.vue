<template>
  <el-main>
    <div class="block">
      <el-form :inline="true">
        <el-form-item label="代码：">
          <el-input size="small" ref="code" clearable placeholder="代码"></el-input>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input size="small" clearable ref="codename" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="small" @click="findData">查询</el-button>
          <el-button type="small" @click="addData">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <code-edit
      @close-dialog="dataSubmit"
      :isEdit="isEdit"
      :code-data="editData"
      v-if="editData"
      v-model="showDialog"
      ref="testCom"
    />

    <el-container>
      <el-aside width="200px" :style="{height:$store.state.sys.screen.DataHeight - 60 +'px'}">
        <el-scrollbar style="height:100%">
          <code-tree @node-click="nodeclick"/>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <el-table
          ref="singleTable"
          :data="codeDatas|dataFilter(filterData,queryInfo)|pageFilters(page.size,page.curpage,page)"
          border
          :height="$store.state.sys.screen.DataHeight - 80"
          stripe
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="CODE" label="代码" width="80"></el-table-column>
          <el-table-column prop="CODENAME" header-align="center" label="代码名称" width="150"></el-table-column>
          <el-table-column label="备注" prop="REMARK"></el-table-column>
          <el-table-column label="操作" width="140">
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
      </el-main>
    </el-container>
  </el-main>
</template>

<script>
import codeTree from "./codeTree.vue";
import codeEdit from "./edit.vue";
import * as demoData from "./data.js";
export default {
  name: "page",
  components: {
    codeTree,
    codeEdit
  },
  data() {
    return {
      editData: {
        type: Object
      },
      queryInfo: {
        code: "",
        codename: ""
      },
      filterData: "",
      curWidth: 500,
      isEdit: false,
      showDialog: false,
      curEditData: 0,
      page: {
        size: 5,
        curpage: 1,
        total: 5
      },
      codeDatas: demoData.codeDatas
    };
  },
  watch: {
    //editData(newVal, oldVal) {}
  },
  mounted() {},
  updated() {},
  filters: {
    dataFilter: function(values, obj, queryInfo) {
      let newValues = values.filter(function(value) {
        let newV = value.CODETYPE == obj.CODETYPE;
        if (queryInfo.code.trim() != "")
          newV = newV && value.CODE == queryInfo.code;

        if (queryInfo.codename.trim() != "") {
          newV = newV && value.CODENAME.includes(queryInfo.codename);
        }
        return newV;
      });
      return newValues;
    }
  },
  methods: {
    findData() {
      //如果实时触发查询条件，需要在input中使用v-model
      this.queryInfo.code = this.$refs.code.currentValue;
      this.queryInfo.codename = this.$refs.codename.currentValue;
    },
    sortData() {
      this.codeDatas.sort(function(obj1, obj2) {
        var nameA = obj1.CODE.toUpperCase();
        var nameB = obj2.CODE.toUpperCase();
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
    addData() {
      let addData = {
        codeid: "",
        CODETYPE: this.filterData.CODETYPE,
        CONTENT: this.filterData.CONTENT,
        CODE: "",
        CODENAME: "",
        superid: "0",
        LEVE: 2,
        ORDERBY: 0,
        applyto: 2,
        REMARK: ""
      };
      this.editData = JSON.parse(JSON.stringify(addData));
      this.curEditData = this.codeDatas.length + 1;
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
      if (this.page.curpage == 1) this.curEditData = index + 1;
      else this.curEditData = (this.page.curpage - 1) * this.page.size + index;
      this.isEdit = isEdit;
      this.showDialog = true;
    },
    handleDelete(index, curData) {
      let delIndex = this.codeDatas.findIndex(function(element) {
        return element.codeid == curData.codeid;
      });

      this.$delete(this.codeDatas, delIndex);
    },
    dataSubmit(val) {
      // 新增，直接添加
      if (this.isEdit == 2) {
        this.codeDatas.push(val);
        this.sortData();
      }

      //修改，查找元素
      if (this.isEdit == 1) {
        this.$set(this.codeDatas, this.curEditData, val);
      }
    },
    nodeclick(node) {
      this.queryInfo.code = "";
      this.queryInfo.codename = "";
      this.filterData = node;
      let obj = node.CODETYPE;
      this.page.total = this.codeDatas.filter(
        value => value.CODETYPE == obj
      ).length;
      this.page.curpage = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
/* 指标的样式*/
</style>
