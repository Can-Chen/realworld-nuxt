<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="article.tagList"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit()"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createArticle,
  updateArticle,
  getArticleDetail,
} from "../../api/article";
export default {
  name: "EditorIndex",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },
  methods: {
    async onSubmit() {
      const { data } = this.$route.params.title
        ? await updateArticle(
            { ...this.article, tagList: [] },
            this.$route.params.title
          )
        : await createArticle({
            ...this.article,
            tagList: [],
          });

      if (data?.article) {
        this.$router.push(`/article/${data.article.slug}`);
      }
    },
  },
  async mounted() {
    if (this.$route.params.title) {
      const { data } = await getArticleDetail(this.$route.params.title);
      const { title, description, body } = data?.article;
      this.article.title = title || "";
      this.article.description = description || "";
      this.article.body = body || "";
    }
  },
};
</script>

<style lang="scss" scoped>
</style>