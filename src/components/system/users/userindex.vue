<template>
<el-container>
  <el-aside width="200px">
    <department-tree @node-click="nodeclick" ref="departTree" />
  </el-aside>
  <el-main>
    <div class="block">
      <el-form :inline="true">
        <el-form-item label="用户姓名：">
          <el-input size="small" ref="username" clearable placeholder="用户姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="small" @click="findData">查询</el-button>
          <el-button type="small" @click="addData">新增</el-button>
        </el-form-item>
        <edit-info @close-dialog="dataSubmit" :isEdit="isEdit" :user-data="editData" v-if="editData" v-model="showDialog" ref="testCom" />
      </el-form>
    </div>
    <div class="block">
      <el-table ref="userDatas" :data="userDatas|userFilter(currentDeptUsers, queryInfo)|pageFilters(page.size,page.curpage,page)" border :height="$store.state.sys.screen.DataHeight" stripe highlight-current-row style="width: 100%">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column prop="LOGINCODE" label="登录名" width="90">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="160">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="60">
          <template slot-scope="scope">
            <el-switch style="display: block" disabled v-model="scope.row.gender" :active-value=1 :inactive-value=0>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="50">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="USERSTATUS" label="状态" width="80">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="address" label="地址">
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
import editInfo from "./useredit.vue";
import departmentTree from "../departments/departmenttree.vue";
import * as demoData from "./data.js";
import { uuidUtils } from "@/common/common.js";
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
        userName: ""
      },
      curWidth: 500,
      isEdit: false,
      showDialog: false,
      page: {
        size: 5,
        curpage: 1,
        total: 5
      },
      userDatas: demoData.userDatas,
      deptUsers: demoData.deptUsers,
      currentDeptUsers: null
    };
  },
  watch: {
    //editData(newVal, oldVal) {}
  },
  mounted() {},
  updated() {},
  filters: {
    userFilter: function(values, currentDeptUsers, queryInfo) {
      if (currentDeptUsers == null) return values;
      return values.filter(function(data) {
        let test = currentDeptUsers.findIndex(function(curDept) {
          return data.USERID == curDept.UserID;
        });

        return test != -1;
      });
    }
  },
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
        USERID: "",
        LOGINCODE: "",
        VALID: 1,
        username: "",
        PASSWORD: "",
        gender: 1,
        age: 0,
        avatar: "",
        birthday: "",
        qq: "",
        email: "",
        address: "",
        phone: "",
        userorder: "",
        USERSTATUS: ""
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
      let delIndex = this.userDatas.findIndex(function(element) {
        return element.USERID == curData.USERID;
      });
      this.$delete(this.userDatas, delIndex);
    },
    dataSubmit(val) {
      let node = this.$refs.departTree.getCurrentNode();
      let deptUser = {
        ID: "",
        DeptID: "",
        UserID: "",
        Updating_UID: "",
        Updating_Date: ""
      };

      // 新增，直接添加
      if (this.isEdit == 2) {
        let tmpuserid = uuidUtils.getUUID_NoLine();
        //创建关联关系
        deptUser.ID = uuidUtils.getUUID_NoLine();
        deptUser.DeptID = node.DEPTID;
        deptUser.UserID = tmpuserid;
        val.USERID = tmpuserid;
        this.deptUsers.push(deptUser);
        this.userDatas.push(val);
        this.nodeclick(node);
      }
      //修改，查找元素
      if (this.isEdit == 1) {
        let curIndex = this.userDatas.findIndex(function(element) {
          return element.USERID == val.USERID;
        });
        this.$set(this.userDatas, curIndex, val);
      }
    },
    nodeclick(node) {
      let obj = node.DEPTID;
      if (obj != "root") {
        this.currentDeptUsers = this.deptUsers.filter(
          data => data.DeptID == obj
        );
        this.page.total = this.currentDeptUsers.length;
      } else {
        this.currentDeptUsers = null;
        this.page.total = this.userDatas.length;
      }
      this.page.curpage = 1;
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
