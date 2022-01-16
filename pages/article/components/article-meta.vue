<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date("MMM DD,YYYY") }}</span>
    </div>
    <template v-if="article.author.username !== user.username">
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow Eric Simons
        <span class="counter">{{ article.followedBy.length }}</span>
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">{{ article.favoritesCount }}</span>
      </button>
    </template>

    <nuxt-link
      class="btn btn-outline-secondary btn-sm"
      :to="{
        name: 'modify',
        params: {
          title: article.slug,
        },
      }"
      v-else
    >
      <i class="ion-edit"></i> Edit Article
    </nuxt-link>

    <!-- <nuxt-link
      class="btn btn-outline-danger btn-sm"
      ng-class="{disabled: $ctrl.isDeleting}"
      ng-click="$ctrl.deleteArticle()"
    >
      <i class="ion-trash-a"></i> Delete Article
    </nuxt-link> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "articleMeta",
  computed: {
    ...mapState(["user"]),
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>