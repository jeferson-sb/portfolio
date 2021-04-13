<template>
  <div class="pallete">
    <label for="color">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <title>Pick a color</title>
        <path
          d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.854a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"
        />
      </svg>
    </label>
    <input type="color" name="color" id="color" v-model.lazy="color" />

    <div class="shades">
      <span
        class="box"
        v-for="i in 6"
        :key="i"
        :style="`background-color: var(--base-${i * 10});`"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#bf4040',
    }
  },
  watch: {
    color() {
      const { hue, saturation, lightness } = this.hexToHSL(this.color)
      this.$el.querySelector('.shades').style.setProperty('--h', hue)
      this.$el.querySelector('.shades').style.setProperty('--s', saturation)
      this.$el.querySelector('.shades').style.setProperty('--l', lightness)
    },
  },
  methods: {
    hexToHSL(color) {
      const c = color.split('')
      let r = 0
      let g = 0
      let b = 0

      if (c.length === 4) {
        r = `0x${c[1]}${c[1]}`
        g = `0x${c[2]}${c[2]}`
        b = `0x${c[3]}${c[3]}`
      } else if (c.length === 7) {
        r = `0x${c[1]}${c[2]}`
        g = `0x${c[3]}${c[4]}`
        b = `0x${c[5]}${c[6]}`
      }

      r /= 255
      g /= 255
      b /= 255

      const cmin = Math.min(r, g, b)
      const cmax = Math.max(r, g, b)
      const delta = cmax - cmin
      let h = 0
      let s = 0
      let l = 0

      if (delta === 0) h = 0
      else if (cmax === r) h = ((g - b) / delta) % 6
      else if (cmax === g) h = (b - r) / delta + 2
      else h = (r - g) / delta + 4

      h = Math.round(h * 60)

      if (h < 0) h += 360

      l = (cmax + cmin) / 2
      s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
      s = Number(s * 100).toFixed(1)
      l = Number(l * 100).toFixed(1)

      return {
        hue: h,
        saturation: `${s}%`,
        lightness: `${l}%`,
      }
    },
  },
}
</script>

<style scoped>
.shades {
  --h: 360;
  --s: 50%;
  --l: 50%;

  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 10px;
}

.box {
  --base-10: hsl(var(--h), var(--s), calc(var(--l) + 5%));
  --base-20: hsl(var(--h), var(--s), calc(var(--l) + 15%));
  --base-30: hsl(var(--h), var(--s), calc(var(--l) + 25%));
  --base-40: hsl(var(--h), var(--s), calc(var(--l) + 35%));
  --base-50: hsl(var(--h), var(--s), calc(var(--l) + 45%));
  --base-60: hsl(var(--h), var(--s), calc(var(--l) + 55%));

  display: block;
  background-color: hsl(var(--h), var(--s), var(--l));
  border-radius: var(--radius-default);
  width: 60px;
  height: 60px;
}

label {
  border-radius: 50%;
  border: 1px solid #fff;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

input[type='color'] {
  visibility: hidden;
  position: absolute;
}
</style>
