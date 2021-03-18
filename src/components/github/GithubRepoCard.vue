<template>
  <div class="github-repo-card">
    <h4 class="github-repo-card__title">
      <g-link :to="pullRequest.repository.url">
        {{ pullRequest.repository.nameWithOwner }}
      </g-link>
    </h4>
    <p class="github-repo-card__description">
      {{ pullRequest.repository.description }}
    </p>
    <p class="github-repo-details">
      <span class="github-repo-language">
        <CircleFillSVG />
        <span>{{ pullRequest.repository.primaryLanguage.name }}</span>
      </span>
      <span class="github-repo-pullrequest">
        <g-link :to="pullRequest.url">
          <PullRequestSVG />
          <span>Last PR #{{ pullRequest.number }}</span>
        </g-link>
      </span>
    </p>
  </div>
</template>

<script>
import PullRequestSVG from '@/assets/svg/git-pull-request.svg'
import CircleFillSVG from '@/assets/svg/circle-fill.svg'

export default {
  props: {
    pullRequest: {
      type: Object,
    },
  },
  components: {
    PullRequestSVG,
    CircleFillSVG,
  },
}
</script>

<style scoped>
.github-repo-card {
  padding: 18px 28px;
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
  margin-top: 18px;
  color: var(--text-color-default);
}

.github-repo-details span {
  font-weight: 700;
  color: inherit;
}

.github-repo-details span + span {
  margin-left: 12px;
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

.github-repo-details svg {
  vertical-align: inherit;
  margin-right: 5px;
}

body[data-theme='light'] .github-repo-card {
  border: var(--border);
}

body[data-theme='light'] .github-repo-card__description {
  color: var(--color-gray-500);
}
</style>
