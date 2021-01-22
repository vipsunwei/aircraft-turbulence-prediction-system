<template>
  <layout></layout>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Layout from "./views/Layout.vue";
export default defineComponent({
  name: "App",
  components: { Layout }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
