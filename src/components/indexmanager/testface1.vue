<template>
<el-main>
  <el-header>
    <el-form :inline="true" :model="sysCode" class="demo-form-inline">
      <el-form-item label="系统代码">
        <el-input v-model="sysCode.name" placeholder="代码"></el-input>
      </el-form-item>
      <el-form-item label="代码描述">
        <el-input v-model="sysCode.desc" placeholder="描述信息"></el-input>

      </el-form-item>
      <el-form-item>
        <el-button type="small" @click="findData">查询</el-button>
        <el-button type="small" @click="setCurrent(tableData[1])">选择第二行</el-button>
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </el-form-item>

    </el-form>

  </el-header>
  <el-container>
    <el-table ref="singleTable" :data="tableData" border :row-class-name="tableRowClassName" :max-height="$store.state.sys.screenHeight" stripe highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column prop="indexId"  label="指标ID" width="80">
      </el-table-column>
      <el-table-column prop="indexName" header-align="center"  label="指标名称" width="150">
      </el-table-column>
      <el-table-column prop="dataType" label="数据类型" width="100">
      </el-table-column>
      <el-table-column prop="superId" label="上级指标" width="80">
      </el-table-column>
      <el-table-column prop="isCore" label="是否核心" width="80">
      </el-table-column>
      <el-table-column prop="breviary" label="摘要">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>

</el-main>
</template>

<script>
export default {
  name: "page",
  data() {
    return {
      test: "123",
      curWidth: 500,
      curValue: "sdfsdf",
      sysCode: {
        name: "",
        desc: ""
      },
      tableData: [
        {
          indexId: "A01",
          indexName: "名称",
          dataType: "字符",
          superId: "A",
          isCore: "是",
          breviary: "描述名称相关信息"
        },
        {
          indexId: "A01",
          indexName: "名称",
          dataType: "字符",
          superId: "A",
          isCore: "是",
          breviary: "描述名称相关信息"
        },
        {
          indexId: "A01",
          indexName: "名称",
          dataType: "字符",
          superId: "A",
          isCore: "是",
          breviary: "描述名称相关信息"
        },
        {
          indexId: "A01",
          indexName: "名称",
          dataType: "字符",
          superId: "A",
          isCore: "是",
          breviary: "描述名称相关信息"
        },
        {
          indexId: "A01",
          indexName: "名称",
          dataType: "字符",
          superId: "A",
          isCore: "是",
          breviary: "描述名称相关信息"
        }
      ]
    };
  },
  methods: {
    findData() {},
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.singleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.singleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
}

.el-header {
  padding-right: 5px;
  padding-left: 5px;
}
</style>
<style lang="scss">
.el-table .warning-row {
  background: red;
}

.el-table .success-row {
  background: #5fb92f;
}
</style>
