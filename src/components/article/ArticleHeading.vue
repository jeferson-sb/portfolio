<template>
  <div class="article-heading">
    <h1>{{ title }}</h1>
    <p class="article-info">
      <time :datetime="datetime">
        {{ displayDate }}
      </time>
      <span class="article-source" v-if="crosspostedOn && crosspostLink">
        Originally posted on
        <a :href="crosspostLink" target="_blank" rel="noopener noreferrer">
          {{ crosspostedOn }}
        </a>
      </span>
      <TagGroup :tags="tags" />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    datetime: {
      type: String,
    },
    displayDate: {
      type: String,
    },
    crosspostedOn: {
      type: String,
    },
    crosspostLink: {
      type: String,
    },
    tags: {
      type: Array,
    },
  },
}
</script>

<style scoped>
.article-heading {
  background-color: var(--accent-color-lighter, var(--color-gray-800));
  padding: calc(2vw + 85px) calc(1vw + 200px);
  max-height: 340px;
  box-shadow: var(--elevation-2);
  text-align: center;
}

body[data-theme='light'] .article-heading {
  box-shadow: var(--elevation-3);
}

.article-heading h1 {
  font-size: clamp(var(--text-lg), 1vw + var(--text-xl), var(--text-2xl));
}

.article-info {
  display: flex;
  flex-flow: row wrap;
  opacity: 0.7;
  justify-content: center;
}

.article-info .tags {
  margin: 0;
}

.article-info time {
  margin-right: 9px;
}

.article-info .article-source {
  margin-right: 9px;
  padding-left: 9px;
  border-left: 1px solid var(--text-color-default);
}

@media screen and (max-width: 425px) {
  .article-heading {
    padding: 20px;
    text-align: left;
  }

  .article-heading h1 {
    margin-bottom: 2vw;
  }

  .article-info {
    justify-content: unset;
  }

  .article-info time {
    flex-basis: 100%;
    margin-bottom: 7px;
  }
}
</style>
