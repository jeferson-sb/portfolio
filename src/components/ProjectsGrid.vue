<template>
  <div class="container">
    <h2 class="hasHeadline" data-aos="zoom-in">{{ $t('projects') }}</h2>
    <section class="projectGrid">
      <div
        class="projectGrid-item"
        v-for="(item, index) in projects"
        :key="item.node.id"
        data-aos="fade-up"
        data-aos-easing="ease-in-out"
        data-aos-duration="600"
        :data-aos-delay="index * 100"
      >
        <header class="projectGrid-item-header">
          <span>{{ item.node.type }}</span>
          <p>{{ item.node.title }}</p>
        </header>
        <g-link :to="item.node.demo">
          <g-image
            :src="
              item.node.thumbnail ? item.node.thumbnail : '~/assets/img/me.png'
            "
            :alt="`${item.node.title} screenshot`"
          />
        </g-link>
        <footer class="projectGrid-item-footer">
          <g-link :href="item.node.demo" class="btn" v-if="item.node.demo">
            Demo
            <fa-icon :icon="['fas', 'external-link-alt']"></fa-icon>
          </g-link>
          <g-link :href="item.node.github" class="btn isDarken">
            <fa-icon :icon="['fab', 'github']"></fa-icon>Github
          </g-link>
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100% !important;
}
.container h2 {
  font-size: 3rem;
  margin-bottom: 30px;
  color: var(--color-default-white);
  margin-top: 3rem;
  &::after {
    background-color: var(--color-default-white);
  }
}

.projectGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.4em;
  margin-bottom: 50px;

  &-item {
    &-header {
      display: flex;
      justify-content: space-between;
    }
    &-header span {
      color: #ffffff9e;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: bold;
    }
    &-header p {
      color: var(--color-default-white);
    }

    img {
      border-radius: 4px;
      border: 2px solid transparent;
      &:hover {
        transition: all 0.4s ease-in-out;
        border-color: var(--color-primary);
        cursor: zoom-in;
      }
    }

    &-footer {
      display: flex;
      .btn {
        margin-top: 5px;
        width: 100%;
        text-align: center;
        padding: 8px 16px;
        border-radius: 4px;
        background-color: #dbdbdb;
      }
      .btn svg {
        margin-right: 5px;
      }
      .btn:nth-child(1) {
        border-radius: 4px 0 0 4px;
      }
      .btn:nth-child(2) {
        border-radius: 0 4px 4px 0;
      }
      & > .btn:only-of-type {
        border-radius: 4px;
      }
    }
  }
}

.btn {
  &.isDarken {
    background-color: var(--color-default-black);
    color: var(--color-default-white);
  }
  &:hover {
    transition: all 0.4s ease-in-out;
    background-color: var(--color-primary);
  }
}

@media screen and (max-width: $mobile-breakpoint) {
  .container {
    align-items: initial;
    height: 100%;
    h2 {
      font-size: 2rem;
    }
  }
  .projectGrid {
    grid-template-columns: 1fr;
  }
  .projectGrid-item img {
    width: 100%;
  }
}
</style>
