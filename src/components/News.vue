<template>
  <div>
    <Categories />
    <Pagination
      :paginations="paginations"
      :paginateFunc="paginateFunc"
      :allArticles="allArticles"
    />
    <div class="flex">
      <p class="mb-2">Nigeria News</p>
    </div>
    <div v-for="(article, index) in news" :key="index">
      <news-card :article="article" :addToList="addToList" class="flex" />
    </div>
    <Pagination :paginations="paginations" :paginateFunc="paginateFunc" />
  </div>
</template>

<script lang="ts">
import { getNews, state } from "@/store";
import { computed, defineComponent, reactive, toRefs } from "vue";

import NewsCard from "./NewsCard.vue";
import Categories from "./Categories.vue";
import Pagination from "./Pagination.vue";

export default defineComponent({
  components: { NewsCard, Pagination, Categories },
  name: "Categroies",
  setup() {
    const { news, totalFromState, allArticles } = toRefs(state);
    const localPage: any = reactive({
      page: 0,
      news: news.value.slice(0, 5),
    });

    const paginate = totalFromState.value;

    const paginateArray = computed(() =>
      Array.from(Array(paginate).keys()).map((page, i) => i)
    );

    const total = Math.ceil(totalFromState.value) / 5;

    const paginateFunc = async (pageNumber: number) => {
      localPage.page = pageNumber;
      localPage.news = news.value.slice(pageNumber * 5, 5 * (pageNumber + 1));
      const from = pageNumber * 5;
      const to = 5 * (pageNumber + 1);
      await getNews(from, to);
    };

    const addToList = (article: any) => {
      const localStorageArticles = JSON.parse(
        localStorage.getItem("newsList") as string
      )
        ? JSON.parse(localStorage.getItem("newsList") as string)
        : [];

      const isArticleAdded =
        localStorageArticles.filter(
          (localStorageArticle: any) =>
            localStorageArticle.title === article.title
        ).length > 0;

      if (localStorageArticles && isArticleAdded) {
        alert("added already");
        return;
      }
      localStorage.setItem(
        "newsList",
        JSON.stringify(localStorageArticles.concat(article))
      );
    };

    console.log("pagination == ", allArticles.value);

    return {
      news,
      allArticles,
      paginations: paginateArray.value.slice(0, total),
      paginateFunc,
      addToList,
    };
  },
});
</script>

<style scoped></style>
