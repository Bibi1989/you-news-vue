<template>
  <div class="">
    <News />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import News from "./News.vue";

export default defineComponent({
  name: "NewsLanding",
  components: { News },

  setup() {
    return {};
  },
});
</script>

<style scoped>
.hello {
  height: 100vh;
  width: 100%;
}
</style>
