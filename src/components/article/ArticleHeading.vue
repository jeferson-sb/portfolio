<template>
  <div class="article-heading">
    <h1>{{ title }}</h1>
    <p class="article-info">
      <span v-if="crosspostedOn && crosspostLink" class="article-source">
        Originally posted on
        <a :href="crosspostLink" target="_blank" rel="noopener noreferrer">
          {{ crosspostedOn }}
        </a>
      </span>
      <time :datetime="datetime">
        {{ displayDate }}
      </time>
      <TagGroup :tags="tags" />
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  displayDate: {
    type: String,
    required: true,
  },
  crosspostedOn: {
    type: String,
    default: null,
  },
  crosspostLink: {
    type: String,
    default: null,
  },
  tags: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.article-heading {
  background-color: var(--accent-color-lighter, transparent);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1054%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(35%2c 38%2c 42%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c592.165C109.007%2c566.317%2c138.349%2c421.885%2c227.689%2c354.29C306.82%2c294.42%2c424.424%2c299.022%2c488.068%2c222.893C559.35%2c137.627%2c628.04%2c20.638%2c595.447%2c-85.612C562.308%2c-193.643%2c416.165%2c-212.391%2c331.564%2c-287.302C261.684%2c-349.179%2c233.432%2c-464.006%2c142.82%2c-486.399C52.219%2c-508.79%2c-25.201%2c-415.472%2c-116.903%2c-398.134C-223.545%2c-377.971%2c-346.451%2c-439.569%2c-435.208%2c-377.11C-525.245%2c-313.751%2c-567.097%2c-191.597%2c-566.854%2c-81.501C-566.622%2c23.85%2c-477.719%2c102.35%2c-433.94%2c198.174C-390.17%2c293.98%2c-387.54%2c410.877%2c-309.557%2c481.681C-226.765%2c556.851%2c-108.809%2c617.965%2c0%2c592.165' fill='%2317191b'%3e%3c/path%3e%3cpath d='M1440 1252.313C1568.351 1242.746 1696.31 1189.842 1784.5720000000001 1096.165 1865.374 1010.406 1871.145 883.4390000000001 1896.059 768.275 1916.007 676.067 1920.846 585.836 1915.349 491.655 1909.354 388.93600000000004 1929.327 272.14 1862.535 193.87099999999998 1795.701 115.55200000000002 1671.874 133.79700000000003 1576.62 94.71699999999998 1466.569 49.56700000000001 1375.812-80.08799999999997 1259.898-53.37099999999998 1145.215-26.937999999999988 1112.52 121.26499999999999 1044.56 217.35000000000002 983.972 303.013 912.082 379.14099999999996 882.737 479.878 850.262 591.359 838.944 708.657 868.751 820.881 902.038 946.206 957.28 1071.967 1060.755 1150.116 1167.391 1230.652 1306.739 1262.246 1440 1252.313' fill='%232f3339'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1054'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  background-size: cover;
  will-change: background;
  padding: calc(2vw + 85px) calc(1vw + 200px);
  max-height: 340px;
  box-shadow: var(--elevation-2);
  text-align: center;

  & h1 {
    font-size: clamp(var(--text-lg), 1vw + var(--text-xl), var(--text-2xl));
  }
}

body[data-theme='light'] {
  & .article-heading {
    box-shadow: var(--elevation-3);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1055%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(238%2c 240%2c 246%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c592.165C109.007%2c566.317%2c138.349%2c421.885%2c227.689%2c354.29C306.82%2c294.42%2c424.424%2c299.022%2c488.068%2c222.893C559.35%2c137.627%2c628.04%2c20.638%2c595.447%2c-85.612C562.308%2c-193.643%2c416.165%2c-212.391%2c331.564%2c-287.302C261.684%2c-349.179%2c233.432%2c-464.006%2c142.82%2c-486.399C52.219%2c-508.79%2c-25.201%2c-415.472%2c-116.903%2c-398.134C-223.545%2c-377.971%2c-346.451%2c-439.569%2c-435.208%2c-377.11C-525.245%2c-313.751%2c-567.097%2c-191.597%2c-566.854%2c-81.501C-566.622%2c23.85%2c-477.719%2c102.35%2c-433.94%2c198.174C-390.17%2c293.98%2c-387.54%2c410.877%2c-309.557%2c481.681C-226.765%2c556.851%2c-108.809%2c617.965%2c0%2c592.165' fill='%237f8ebb'%3e%3c/path%3e%3cpath d='M1440 1252.313C1568.351 1242.746 1696.31 1189.842 1784.5720000000001 1096.165 1865.374 1010.406 1871.145 883.4390000000001 1896.059 768.275 1916.007 676.067 1920.846 585.836 1915.349 491.655 1909.354 388.93600000000004 1929.327 272.14 1862.535 193.87099999999998 1795.701 115.55200000000002 1671.874 133.79700000000003 1576.62 94.71699999999998 1466.569 49.56700000000001 1375.812-80.08799999999997 1259.898-53.37099999999998 1145.215-26.937999999999988 1112.52 121.26499999999999 1044.56 217.35000000000002 983.972 303.013 912.082 379.14099999999996 882.737 479.878 850.262 591.359 838.944 708.657 868.751 820.881 902.038 946.206 957.28 1071.967 1060.755 1150.116 1167.391 1230.652 1306.739 1262.246 1440 1252.313' fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1055'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  }
}

.article-info {
  display: flex;
  flex-flow: row wrap;
  opacity: 0.7;
  justify-content: center;

  & time {
    margin-inline-end: 16px;
  }

  .article-source {
    flex-basis: 100%;
    margin-block: 0.25rem;
    font-style: italic;
  }
}

@media screen and (max-width: 31.25em) {
  .article-heading {
    padding: 1.25rem;
    text-align: left;

    & h1 {
      margin-block-end: 2vw;
    }
  }

  .article-info {
    justify-content: flex-start;
  }
}
</style>
