import { getHttp } from "@/lib/api";
import { reactive, toRefs } from "vue";

const dynamicUrl = (country?: string | null, category?: string) =>
  `https://newsapi.org/v2/top-headlines?country=${country ?? "ng"}&category=${
    category ?? ""
  }&apiKey=${process.env.VUE_APP_NEWS_API_KEY}`;

export const state = reactive({
  news: [],
  loading: false,
  error: null,
  totalFromState: 0,
  allArticles: [],
});

export const getNews = async (from?: number, to?: number) => {
  try {
    const url = dynamicUrl(null);
    state.loading = true;
    const data = await getHttp(url);
    state.loading = false;
    state.totalFromState = data?.articles?.length;
    state.allArticles = data?.articles;
    state.news = data?.articles?.slice(from, to);
  } catch (error: any) {
    state.loading = false;
    state.error = error.response?.data?.message;
  }
};

export const filterNews = async (category?: string) => {
  try {
    const url = dynamicUrl("", category);
    state.loading = true;
    const data = await getHttp(url);
    state.loading = false;
    state.news = data?.articles;
  } catch (error: any) {
    state.loading = false;
    state.error = error;
  }
};

export const myLists = () => {
  try {
    const localStorageArticles = JSON.parse(
      localStorage.getItem("newsList") as string
    )
      ? JSON.parse(localStorage.getItem("newsList") as string)
      : [];

    state.news = localStorageArticles;
  } catch (error: any) {
    state.error = error;
  }
};
