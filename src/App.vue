<template>
  <div class="px-24 py-10">
    <news-landing />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NewsLanding from "./components/NewsLanding.vue";
import { getNews } from "./store";

export default defineComponent({
  components: { NewsLanding },
  name: "App",
  setup() {
    (async () => {
      await getNews(0, 5);
    })();

    return {};
  },
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
