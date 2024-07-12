<template>
  <div id="app">
    <div class="container">
      <TreeComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
<style lang="scss">
.container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 10px 35px;
}
</style>
