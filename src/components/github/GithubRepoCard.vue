<template>
  <div class="github-repo-card">
    <div class="github-repo-card__heading">
      <h4 class="github-repo-card__title">
        <AppLink is-external :to="repository.url">
          {{ repository.nameWithOwner }}
        </AppLink>
      </h4>
      <p class="github-repo-card__description">
        {{ repository.description }}
      </p>
    </div>
    <p class="github-repo-details">
      <span class="github-repo-language">
        <CircleFillSVG />
        <span>{{ repository.primaryLanguage.name }}</span>
      </span>
      <span class="github-repo-pullrequest">
        <AppLink is-external :to="url">
          <PullRequestSVG />
          <span>Last PR #{{ number }}</span>
        </AppLink>
      </span>
    </p>
  </div>
</template>

<script setup>
defineProps({
  repository: {
    type: Object,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped>
.github-repo-card {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  padding: 1.125rem 1.75rem;
  background-color: var(--bg-color-lighter, var(--color-gray-800));
  border-radius: var(--radius-default);
  color: var(--text-color-default);
}

.github-repo-card__title {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
}

.github-repo-card__description {
  color: var(--color-gray-300);
}

.github-repo-details {
  display: flex;
  margin-block-start: 1.125rem;
  color: var(--text-color-default);

  & span {
    font-weight: var(--fw-bold);
    color: inherit;
  }

  & span+span {
    margin-inline-start: 0.75rem;
  }

  svg {
    vertical-align: inherit;
    margin-inline-end: 5px;
  }
}

.github-repo-language,
.github-repo-pullrequest a {
  display: flex;
  align-items: center;
}

.github-repo-language svg {
  height: 12px;
  width: 12px;
}

body[data-theme='light'] {
  .github-repo-card {
    border: var(--border);
  }

  .github-repo-card__description {
    color: var(--color-gray-500);
  }
}
</style>
