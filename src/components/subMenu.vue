<template>
  <div id="aside">
    <el-menu
      default-active="1"
      @open="handleOpen"
      @close="handleClose"
      :collapse="this.$store.state.sys.collapse"
      unique-opened
      router
    >
      <template v-for="(item,index) in sysMenu">
        <el-submenu :index="item.path" :key="item.path" v-if="item.isParent">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.name}}({{index}})</span>
          </template>
          <template v-for="(child) in item.children">
            <el-menu-item :index="child.path" :key="child.path">{{child.name}}</el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item v-if="!item.isParent" :key="item.path" :index="item.path">
          <i class="el-icon-menu"></i>
          <span class="collapse-font" slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { Menus } from "@/router/menu.js";
//import "@/plugs/slimscroll.min.js";
export default {
  name: "sys-submenu",
  data() {
    return {
      activeIndex: "/",
      sysMenu: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    clickMenu(curvalue) {}
  },
  watch: {
    $route: function(to, from) {
      this.activeIndex = this.$route.path;
    }
  },
  mounted() {
    this.sysMenu = Menus;
  }
};
</script>

<style lang="scss" scoped>
</style>
