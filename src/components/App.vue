<template>
  <div id="app">
    <test />  
  </div>
</template>

<script>
import test from './src/test.vue'

export default {
  components: { test },
  computed: {
    loaded() {
      return this.$store.state.loadState == "loaded";
    }
  }
};
</script> 