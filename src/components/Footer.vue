<template>
  <footer>
    <p>Made with ♥ by Jeferson &copy; {{ currentYear }} All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/_vars.scss";

footer {
  padding: 1.4rem;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("../assets/img/bg-img-03.jpg");
  background-size: cover;
  background-position: 20px 100px;
  p {
    color: $white;
    text-align: center;
  }
}
</style>