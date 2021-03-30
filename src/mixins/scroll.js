export default {
  methods: {
    handleScroll(event) {
      this.handleScrollChange(event)
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
