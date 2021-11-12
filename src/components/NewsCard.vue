<template>
  <div>
    <div class="flex mb-4">
      <img
        :src="src(article?.urlToImage)"
        alt=""
        class="rounded-lg"
        width="300"
        height="250"
      />
      <div class="ml-10">
        <p class="mb-1">{{ title(article?.title) }}</p>
        <p class="text-blue-500 mb-4">Source - {{ article?.source?.name }}</p>
        <p class="mb-4">{{ description(article?.description) }}</p>
        <button
          @click="
            () => {
              addToList(article);
            }
          "
          class="bg-blue-400 px-4 rounded text-white text-sm"
        >
          Add To List
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { truncateText } from "@/lib/truncateText";

export default defineComponent({
  props: {
    article: {
      type: Object,
    },
    addToList: {
      type: Function,
    },
  },
  setup(props) {
    const title = (text: string) => (text ? truncateText(text, 50) : "");
    const description = (text: string) => (text ? truncateText(text, 150) : "");
    const src = (img: any) =>
      img
        ? img
        : "https://static.euronews.com/articles/wires/794/70/7947034/1024x538_a7jl1x.jpg?1636661108";

    const addedLists =
      JSON.parse(localStorage.getItem("newsList") as string) ?? [];

    const isAddedAlready = computed(
      () =>
        addedLists?.filter(
          (addedList: any) => addedList?.title === props?.article?.title
        ).length > 0
    );

    return {
      title,
      description,
      src,
      isAddedAlready: isAddedAlready.value,
    };
  },
});
</script>

<style scoped></style>
