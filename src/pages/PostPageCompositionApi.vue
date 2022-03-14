<template>
  <div>
    <h1>Страница с постами</h1>
    <h1>{{ likes }}</h1>

    <my-button @click="addLike">Add likes</my-button>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..."></my-input>
    <div class="app_btns">
      <my-button >Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"></my-select>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form  />
    </my-dialog>

    <post-list
      :posts="sortedAndSearchedPosts"
      
      v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorepost" class="observer"></div>
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import axios from "axios";
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import {usePosts} from "@/hooks/usePosts"
import useSortedPosts from "@/hooks/useSortedPosts"
import usesortedAndSearchedPosts from "@/hooks/usesortedAndSearchedPosts"
import { ref } from "vue";

export default {
  components: {
    PostForm,
    PostList,
    MyInput,
    MyButton,
  },

  data() {
    return {
      dialogVisible: false,

      sortOptions: [
        {
          value: "title",
          name: "По названию",
        },
        { value: "body", name: "По описанию" },
      ],
      searchQuery: "",
    };
  },

  setup(props) {
    /* const likes = ref(0);
    console.log(likes);
    const addLike = () => {
      likes.value += 1;
    };
    return { likes, addLike }; */

    const { posts, totalPages, isPostLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      usesortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
  },
};
</script>

<style>
.app_btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page_wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 7px;
  cursor: pointer;
}

.current_page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
  background: green;
}
</style>