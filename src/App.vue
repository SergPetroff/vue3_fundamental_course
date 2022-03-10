<template>
  <div class="app">
    <h1>Страница с постами</h1>

    <my-input v-model="searchQuery" placeholder="Поиск..."></my-input>
    <div class="app_btns">
      <my-button  @click="showDialog"
        >Создать пост</my-button
      >
      <my-select 
      v-model="selectedSort"
      :options="sortOptions"
      ></my-select>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostLoading" />
    <div v-else>Идет загрузка...</div>

    <div class="page_wrapper">
      <div 
      class="page" 
      v-for="pagenum in totalPages" 
      :key="pagenum"
      :class="{
        'current_page':page === pagenum
      }"
      @click="changePage(pagenum)"
      >
          {{pagenum}}
      </div>
      </div>  
  </div>
</template>

<script>
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";
import axios from "axios";
import MyButton from "./components/UI/MyButton.vue";
import MyInput from './components/UI/MyInput.vue';
export default {
  components: {
    PostForm,
    PostList,
    MyInput,
  },
  setup() {
    MyButton;
  },
  data() {
    return {
      title: "",
      body: "",
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort:'',
      page:1,
      limit:10,
      totalPages:0,
      sortOptions:[{
        value:'title', name:'По названию'},
        {value:'body', name:'По описанию'}
      ],
      searchQuery:''
    };
  },
  methods: {
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
    async fetchPosts() {
      try {
        this.isPostLoading = true;

        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",{
            params:{
              _page:this.page,
              _limit:this.limit
            }
          }
        );
        this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit)
        this.posts = response.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.isPostLoading = false;
      }
    },
    changePage(pageNumber){
      this.page = pageNumber
      //this.fetchPosts();
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed:{
    sortedPosts(){
      return [... this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts(){
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  }
  ,
  watch: {
   page(){
     this.fetchPosts()
   }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}

.app_btns{
  margin: "15px 0";
  display: flex;
  justify-content: space-between;
}

.page_wrapper{
  display:flex;
  margin-top: 15px;
}


.page{
  border: 1px solid black;
  padding: 7px;
  cursor: pointer;
}

.current_page{
  border: 2px solid teal;
}
</style>