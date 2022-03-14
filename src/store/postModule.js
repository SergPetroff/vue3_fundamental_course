import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
            {
                value: "title",
                name: "По названию",
            },
            { value: "body", name: "По описанию" },
        ],

    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(
                    post2[state.selectedSort]
                );
            });
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter((post) =>
                post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        },

    },
    mutations: {
        //для каждого свойства которе будет менятся нужн создать свою мутацию
        setPost(state, posts) {
            state.posts = posts
        },
        setLoadig(state, bool) {
            state.isPostLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setLoadig(state, bool) {
            state.isPostLoading = bool
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        settotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setsearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },



    },
    actions: {
        async fetchPosts({ state, commit }) {
            try {
                //this.isPostLoading = true;
                commit("setLoadig", true)

                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts",
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        },
                    }
                );

                //store.totalPages = Math.ceil(response.headers["x-total-count"] / store.limit);

                commit('settotalPages',Math.ceil(
                    response.headers["x-total-count"] / state.limit
                ))
                //state.posts = response.data;
                commit('setPost', response.data)
            } catch (e) {
                console.error(e);
            } finally {
                //this.isPostLoading = false;
                commit("setLoadig", false)
            }
        },

        async loadMorepost({state, commit}) {
            try {

                //this.page += 1;
                commit('setPage', state.page += 1)


                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts",
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        },
                    }
                );
               /*  state.totalPages = Math.ceil(
                    response.headers["x-total-count"] / state.limit
                ); */
                commit('settotalPages',Math.ceil(
                    response.headers["x-total-count"] / state.limit
                ))
                //state.posts = [...state.posts, ...response.data];

                commit('setPost', [...state.posts, ...response.data])
            } catch (e) {
                console.error(e);
            } finally {

            }
        },
    },
    namespaced:'true'
}