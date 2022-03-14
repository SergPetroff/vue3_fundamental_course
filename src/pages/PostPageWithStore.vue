<template>
  <div >

    
    <h1>Страница с постами</h1>

    <my-input v-focus :model-value="searchQuery" @update:model-value="setsearchQuery" placeholder="Поиск..."></my-input>
    <div class="app_btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"></my-select>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorepost"  class="observer"></div>
   
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";

import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  components: {
    PostForm,
    PostList,
    MyInput,
    MyButton,
  },
  setup() {
    MyButton;
  },
  data() {
    return {
     
      dialogVisible: false,
     
    };
  },
  methods: {

    ...mapMutations({
      setPage:'post/setPage',
      setsearchQuery:'post/setsearchQuery',
      setSelectedSort:'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorepost:'post/loadMorepost',
      fetchPosts:'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },

    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
   
  },
  mounted() {
   this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
        isPostLoading: state => state.post.isPostLoading,
        selectedSort: state => state.post.selectedSort,
        searchQuery: state => state.post.searchQuery,
        page: state => state.post.page,
        limit: state => state.post.limit,
        totalPages: state => state.post.totalPages,
        sortOptions: state => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPost:'post/sortedPost',
      sortedAndSearchedPosts:'post/sortedAndSearchedPosts'
    })
  },
  watch: {
    /* page() {
      this.fetchPosts();
    }, */
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