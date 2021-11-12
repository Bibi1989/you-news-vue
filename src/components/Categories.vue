<template>
  <div class="flex items-center justify-between">
    <div class="flex mb-4">
      <p
        v-for="(category, index) in categories"
        :key="index"
        class="px-4 py-2 bg-blue-500 mr-2 rounded text-white cursor-pointer"
        :class="{ 'bg-blue-800': category.isActive }"
        v-text="category?.name"
        @click="
          () => {
            selectCategory(category.name);
            makeCategoryActive(category.name);
          }
        "
      />
    </div>
    <button @click="myLists" class="bg-green-600 rounded px-4 text-white">
      My Lists
    </button>
  </div>
</template>

<script lang="ts">
import { filterNews } from "@/store";
import { myLists } from "@/store";
import { reactive, defineComponent, toRefs } from "vue";

type CategoriesType = {
  name: string;
  isActive: boolean;
};

const categories = [
  { name: "business", isActive: false },
  { name: "entertainment", isActive: false },
  { name: "general", isActive: false },
  { name: "health", isActive: false },
  { name: "science", isActive: false },
  { name: "sports", isActive: false },
  { name: "technology", isActive: false },
];

export default defineComponent({
  name: "Categroies",
  setup() {
    const state = reactive({
      categories,
    });

    const selectCategory = async (category: string) => {
      await filterNews(category);
    };

    const makeCategoryActive = (category: string) => {
      state.categories = state.categories.map((mapCategory: CategoriesType) => {
        if (mapCategory.name === category) {
          mapCategory.isActive = true;
        } else {
          mapCategory.isActive = false;
        }

        return mapCategory;
      });
    };

    return {
      ...toRefs(state),
      selectCategory,
      makeCategoryActive,
      myLists,
    };
  },
});
</script>

<style scoped>
.active {
  background: red;
}
</style>
