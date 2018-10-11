import Vue from 'vue'

Vue.filter('pageFilters', function (values, pageSize, curPage, page) {
  page.total = values.length; //初始总行数
  let startRow = 0;
  let endRow = 0;
  if (curPage > 1) {
    startRow = (curPage - 1) * pageSize;
  }
  endRow = startRow + pageSize;
  return values.slice(startRow, endRow);
})
