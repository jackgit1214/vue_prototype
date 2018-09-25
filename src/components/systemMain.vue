<template>
<div>
  <main-header />
  <sub-menu/>
  asldjfalsfjasdfasldfjasdf
  <router-view></router-view>
</div>
</template>

<script>
import mainHeader from "@/components/mainHeader.vue";
import subMenu from "@/components/subMenu.vue";
export default {
  name: "sys-main",
  components: {
    mainHeader,
    subMenu
  }
};
</script>

<style scoped>
</style>
