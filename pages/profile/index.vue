<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="image" class="user-img" />
            <h4>{{ username }}</h4>
            <p>
              {{ bio }}
            </p>
            <nuxt-link
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'My-Articles',
                    },
                    params: {
                      username: username,
                    },
                  }"
                  exact
                  class="nav-link"
                  :class="{ active: tab === 'My-Articles' }"
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'Favorited-Articles',
                    },
                    params: {
                      username: username,
                    },
                  }"
                  exact
                  class="nav-link"
                  :class="{ active: tab === 'Favorited-Articles' }"
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: username,
                  },
                }"
              >
                <img :src="image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: username,
                    },
                  }"
                >
                  {{ username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                disabled="true"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page,
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'profile',
                    query: {
                      page: item,
                      tab: tab, // 切换页码的时候和展示类型对应
                    },
                    params: {
                      username: username,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from "../../api/article";
import { getUserInfo } from "../../api/user";
import { mapState } from "vuex";
export default {
  name: "UserProfile",
  watchQuery: ["tab", "page"],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit) || 0;
    },
    ...mapState(["user"]),
  },
  data() {
    return {
      image: "",
      username: "",
      email: "",
      bio: "",
      articlesCount: 0,
      articles: [],
      page: 1,
      tab: 'My-Articles'
    };
  },
  // async mounted() {
  //   const tab = this.$route.query?.tab || "My-Articles",
  //     page = Number.parseInt(this.$router.query?.page) || 1,
  //     limit = 1;

  //   const [userData, articleData] = await Promise.all([
  //     getUserInfo(),
  //     tab === "My-Articles"
  //       ? await getArticles({
  //           limit,
  //           offset: (page - 1) * limit,
  //           author: this.user.email,
  //         })
  //       : await getArticles({
  //           limit,
  //           offset: (page - 1) * limit,
  //           favorited: this.user.email,
  //         }),
  //   ]);

  //   const { image, username, email, bio } = userData.data.user;
  //   const { articlesCount, articles = [] } = articleData.data;

  //   this.image = image;
  //   this.username = username || "123";
  //   this.email = email;
  //   this.bio = bio;
  //   this.articlesCount = articlesCount;
  //   this.articles = articles;
  //   this.page = page;
  //   this.tab = tab;
  //   this.limit = limit;
  // },

  async asyncData({ query, store }) {
    const tab = query?.tab || "My-Articles",
      page = Number.parseInt(query?.page) || 1,
      limit = 1,
      { state } = store;

    const [userData, articleData] = await Promise.all([
      getUserInfo(),
      tab === "My-Articles"
        ? await getArticles({
            limit,
            offset: (page - 1) * limit,
            author: state.user.email,
          })
        : await getArticles({
            limit,
            offset: (page - 1) * limit,
            favorited: state.user.email,
          }),
    ]);

    const { image, username, email, bio } = userData.data.user;
    const { articlesCount, articles = [] } = articleData.data;

    return {
      image: image,
      username: username || "123",
      email: email,
      bio: bio,
      articlesCount: articlesCount,
      articles: articles,
      page: page,
      tab: tab,
      limit: limit,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>