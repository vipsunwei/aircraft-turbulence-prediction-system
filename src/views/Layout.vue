<template>
  <el-container direction="vertical" :style="{ height: '100%' }">
    <el-header height="60px" class="header">
      <div>Header</div>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer height="50px" class="footer"> Footer </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Layout"
});
</script>

<style lang="scss" scoped>
.header,
.footer {
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
}
</style>
