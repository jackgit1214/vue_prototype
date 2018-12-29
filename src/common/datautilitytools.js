import qs from 'qs'
import {
  Message
} from 'element-ui'


import $http from "@/common/fetch";
var DataUtility = {
  data() {
    return {
      loading: true, //遮罩层
      listTableData: [], //表格数据
      listUrl: "", //列表地址,
      params: {},
      page: {
        size: 5,
        curpage: 1,
        total: 5
      },
      state: false
    }
  },
  methods: {
    initListTable: function (url, dataParams) {
      this.params = dataParams;
      this.params.pageSize = this.page.size;
      this.params.pageNo = this.page.curpage;
      this.listUrl = url;
      return this.getListData(this.params);
    },
    getListData: function (params) {
      $http
        .post(this.listUrl, params)
        .then(res => {
          // this.loading = false;
          if (res.code == "success") {
            this.listTableData = res.data;
            this.page.total = res.page.totalSize;
            //this.state = true;
          } else {
            this.listTableData = [];
            //this.state = true;
          }
        })
        .catch(error => {
          //this.loading = false;
          //this.state = false;
        });
    },

    /**
     * 
     * @param {查询URL} url 
     * @param {条件参数} params 
     * @param {回调函数} callback 
     */
    queryData: function (url, params, callback) {
      $http.post(url, params).then(res => {
        if (res.code == "success") {
          callback(res.data);
        }
      });
    },
    /**
     * 
     * @param {更新url} url 
     * @param {businessData为json数据结构} businessDatas 
     */
    updateData: function (url, businessData, callback) {
      $http.post(url, businessData).then(res => {
        if (res.code == "200") {
          this.$message({
            showClose: true,
            message: "保存成功",
            type: "success",
            duration: 1000
          });
          this.getListData(this.params);
          callback(res.data);
        }
      });

    },

    /**
     * 
     * @param {*} url 
     * @param {批量更新数据} businessDatas ，json数据数组
     */
    batchUpdateData: function (url, businessDatas) {

    },

    /**
     * 
     * @param {*} url 
     * @param  {根据业务数据ID，删除数据} businessDataId
     * @param  {删除成功后的回调函数} callback
     */
    removeData: function (url, businessDataId, callback) {
      let $this = this;
      this.$confirm("是否确定删除？", "警告", {
          type: "error"
        })
        .then(mes => {
          $http.post(url, {
            id: businessDataId
          }).then(res => {
            if (res.code == "200") {
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success",
                duration: 1000
              });
              this.getListData(this.params);
              callback();
            }
          });
        })
        .catch(error => {});
    },


    /**
     * 
     * @param {*} url 
     * @param {批量删除数据} businessDataIds
     */
    batchRemoveData: function (url, businessDataIds) {},

    /**
     * 每页行数变化时触发
     * @param {新值} val 
     */
    pageSizeChange(val) {
      this.page.size = val;
      this.params.pageSize = this.page.size;
      this.getListData(this.params);
    },

    /**
     * 页码变化时触发
     * @param {新页值} val 
     */
    pageChange(val) {
      this.page.curpage = val;
      this.params.pageNo = this.page.curpage;
      this.getListData(this.params);
    },
  }
}

export default DataUtility;
