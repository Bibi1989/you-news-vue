<template>
  <div class="flex items-center justify-center">
    <p
      v-for="(pagination, index) in paginations"
      :key="index"
      class="
        paginate
        bg-blue-400
        text-white
        mr-2
        rounded
        cursor-pointer
        flex
        items-center
        justify-center
      "
      @click="
        () => {
          paginateFunc(pagination);
        }
      "
    >
      {{ pagination + 1 }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  props: {
    paginations: {
      type: Array,
    },
    paginateFunc: {
      type: Function,
    },
    allArticles: {
      type: Array,
    },
  },
  setup(props) {
    const state = reactive({
      paginations: props.paginations,
    });

    console.log("paginations", props.allArticles);

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style scoped>
.paginate {
  width: 30px;
  height: 30px;
}
</style>
