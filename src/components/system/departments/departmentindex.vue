<template>
  <el-container>
    <el-aside width="200px">
      <department-tree @node-click="nodeclick" ref="departTree" />
    </el-aside>
    <el-main>
    <div class="block">
      <el-form :inline="true">
        <el-form-item label="部门名称：">
          <el-input size="small" ref="departmentname" clearable placeholder="部门名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="small" @click="findData">查询</el-button>
          <el-button type="small" @click="addData">新增</el-button>
        </el-form-item>
        <edit-info @close-dialog="dataSubmit" :isEdit="isEdit" :department-data="editData" v-if="editData" v-model="showDialog" ref="testCom" />
      </el-form>
    </div>
    <div class="block">
      <el-table ref="singleTable" :data="departmentDatas|departmentFilter(filterDepartmentData,queryInfo)|pageFilters(page.size,page.curpage,page)" border :height="$store.state.sys.screen.DataHeight" stripe highlight-current-row style="width: 100%">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column prop="DEPT_NAME" label="部门名称">

        </el-table-column>

        <el-table-column show-overflow-tooltip prop="dept_desc" label="描述">
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
    </div>
    </el-main>
  </el-container>

</template>

<script>
import editInfo from "./departmentedit.vue";
import departmentTree from "./departmenttree.vue";
import * as demoData from "./data.js";
export default {
  name: "page",
  components: {
    editInfo,
    departmentTree
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
      filterDepartmentData: null,
      curWidth: 500,
      isEdit: false,
      showDialog: false,
      curEditDepartment: 0,
      page: {
        size: 5,
        curpage: 1,
        total: 5
      },
      departmentDatas: demoData.departmentDatas
    };
  },
  watch: {
    //editData(newVal, oldVal) {}
  },
  mounted() {},
  updated() {},
  filters: {
    departmentFilter: function(values, obj, queryInfo) {
      if (obj == null) return values;

      if (!obj.children) obj.children = [];
      return obj.children;
      // let newValues = values.filter(function(value) {
      //   let newV = value.DEPTID != obj.DEPTID && value.SUPERID == obj.DEPTID;
      //   // if (queryInfo.departmentname.trim() != "")
      //   //   newV = newV && value.DEPT_NAME == queryInfo.departmentname;
      //   return newV;
      // });

      // return newValues;
    }
  },
  methods: {
    findData() {
      //如果实时触发查询条件，需要在input中使用v-model

      this.filterDepartmentData = null;
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
        DEPTID: "",
        DEPT_NAME: "",
        SUPERID: this.filterDepartmentData.DEPTID,
        SORTID: 0,
        children: [],
        ENDFLAG: 0,
        dept_desc: "",
        superObject: this.filterDepartmentData
      };
      this.editData = JSON.parse(JSON.stringify(addData));
      this.curEditDepartment = this.departmentDatas.length + 1;
      this.isEdit = 2;
      this.showDialog = true;
    },

    handleEdit(index, curData, isEdit) {
      this.editData = JSON.parse(JSON.stringify(curData));

      if (!this.editData.superObject)
        this.editData.superObject = this.filterDepartmentData;

      if (this.page.curpage == 1) this.curEditDepartment = index + 1;
      else
        this.curEditDepartment =
          (this.page.curpage - 1) * this.page.size + index;
      this.isEdit = isEdit;
      this.showDialog = true;
    },
    handleDelete(index, curData) {
      let node = this.$refs.departTree.getCurrentNode();
      let delIndex = node.children.findIndex(function(element) {
        return element.DEPTID == curData.DEPTID;
      });
      this.$delete(node.children, delIndex);
    },
    dataSubmit(val) {
      // 新增，直接添加
      let node = this.$refs.departTree.getCurrentNode();
      if (this.isEdit == 2) {
        if (!node.children) this.$set(node, "children", []);
        node.children.push(val);
        this.sortData();
      }
      //修改，查找元素
      if (this.isEdit == 1) {
        let editIndex = node.children.findIndex(function(element) {
          return element.DEPTID == val.DEPTID;
        });
        this.$set(node.children, editIndex, val);
      }
    },
    nodeclick(node) {
      this.filterDepartmentData = node;

      let obj = node.DEPTID;
      if (node.children) {
        this.page.total = node.children.length;
      } else this.page.total = 0;
      this.page.curpage = 1;
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate");

    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave");
    next();
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
