<template>
  <div class="github-repo-card">
    <h4 class="github-repo-card__title">
      <a href="https://github.com">{{ repository.name }}</a>
    </h4>
    <p class="github-repo-card__description">{{ repository.description }}</p>
    <p class="github-repo-details">
      <span class="github-repo-language">
        <CircleFillSVG />
        <span>{{ repository.language }}</span>
      </span>
      <span class="github-repo-stars">
        <StarFilledSVG />
        <span>{{ repository.stars }}</span>
      </span>
      <span class="github-repo-prs">
        <PullRequestSVG />
        <span>{{ repository.prs }}</span>
      </span>
    </p>
  </div>
</template>

<script>
import PullRequestSVG from '@/assets/svg/git-pull-request.svg'
import StarFilledSVG from '@/assets/svg/star-fill.svg'
import CircleFillSVG from '@/assets/svg/circle-fill.svg'

export default {
  props: {
    repository: {
      type: Object,
    },
  },
  components: {
    PullRequestSVG,
    StarFilledSVG,
    CircleFillSVG,
  },
}
</script>

<style scoped>
.github-repo-card {
  padding: 18px 28px;
  background-color: var(--bg-color-lighter, var(--color-black-800));
  border-radius: var(--radius-default);
  color: var(--text-color-default);
  flex: 1 1 220px;
}

.github-repo-card + .github-repo-card {
  margin-left: 10px;
}

.github-repo-card__title {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
}

.github-repo-card__title a {
  text-decoration: none;
  color: var(--color-primary);
}

.github-repo-card__title a:hover {
  text-decoration: underline;
}

.github-repo-card__title a:active,
.github-repo-card__title a:focus {
  outline: 2px dashed var(--color-primary);
}

.github-repo-card__description {
  color: var(--color-gray-300);
}

.github-repo-details {
  margin-top: 18px;
  color: var(--text-color-default);
}

.github-repo-details span {
  font-weight: 700;
  color: inherit;
}

.github-repo-details span + span {
  margin-left: 32px;
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
  border: 1px solid rgba(0, 0, 0, 0.1);
}

body[data-theme='light'] .github-repo-card__description {
  color: var(--color-gray-500);
}

@media screen and (max-width: 425px) {
  .github-repo-card + .github-repo-card {
    margin-left: 0;
    margin-top: 32px;
  }
}
</style>
