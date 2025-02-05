<template>
  <main>
    <transition name="swirl">
      <div v-if="!state.isComputerDead" class="content">
        <img src="@/assets/img/meme.png" alt="Doge" loading="lazy" class="doge" width="200" />
        <img v-if="state.isCrashing" src="@/assets/img/water_drop.png" alt="water drop" loading="lazy" class="sweat"
          width="30" />

        <div :class="consoleStyles">
          <pre>me@cia ~ $ {{ state.commandHistory[0] || state.prompt }} <span v-show="state.nextLine === 1" class="cursor"></span></pre>
          <pre
            v-show="state.nextLine >= 2">Enter password: {{ state.commandHistory[1] || state.prompt }} <span v-show="state.nextLine === 2" class="cursor"></span></pre>
          <pre
            v-show="state.nextLine >= 3">mysql> {{ state.commandHistory[2] || state.prompt }}<span v-show="state.nextLine === 3" class="cursor"></span></pre>
          <pre v-show="state.nextLine >= 4" class="breakline">uh-oh....</pre>
          <pre v-show="state.nextLine >= 5" class="breakline">
[ERROR] ... beep boop ...</pre>
        </div>

        <blockquote class="credits">
          (Credits for the console illustration to
          <a href="https://codepen.io/joseluisq" target="_blank">Jose Quintana</a>)
        </blockquote>
      </div>
      <h1 v-else class="error">
        Not found
        <Button href="/" variant="outline">Go back home</Button>
      </h1>
    </transition>
    <SpotLightSVG class="spotlight" />
  </main>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'

import config from '../config/siteconfig.json'

const route = useRoute()
const title = 'Page Not Found'
const description = 'This page could not be found'

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: `${config.siteUrl}${route.path}` },
    {
      property: 'twitter:title',
      content: title,
    },
    {
      property: 'twitter:description',
      content: description,
    },
  ],
})

const state = reactive({
  speed: 100,
  errorDelay: 6000,
  prompt: '',
  commandHistory: [],
  commands: ['mysql -u root -p', '*******', 'DELETE FROM secret_stuff'],
  nextLine: 1,
  isComputerDead: false,
  isCrashing: false,
})

const gen = ref(null)

const consoleStyles = computed(() => ({
  console: true,
  'console--burning': state.isCrashing,
}))

const typing = (command) => {
  let i = 0
  const timer = setInterval(() => {
    if (i < command.length) {
      state.prompt += command.charAt(i)
      i += 1
    } else {
      clearInterval(timer)
      state.commandHistory.push(state.prompt)
      state.prompt = ''

      if (state.commandHistory.length < state.commands.length) {
        state.nextLine += 1
        gen.value.next()
      }
    }
  }, state.speed)
}

function* typeCommands() {
  const [first, second, third] = state.commands

  yield typing(first)
  yield typing(second)
  yield typing(third)
}

const timeline = ({ start }) => {
  let timeQueue = start
  const scenes = []

  const play = () => {
    scenes.forEach((scene) => {
      setTimeout(scene.cb, scene.timeStart)
    })
  }

  const set = (name, cb) => {
    timeQueue += 1500
    scenes.push({ name, cb, timeStart: timeQueue })
  }

  return {
    play,
    set,
  }
}

onMounted(() => {
  gen.value = typeCommands()
  gen.value.next()

  const t = timeline({ start: state.errorDelay })
  t.set('message1', () => {
    state.nextLine += 1
  })

  t.set('message2', () => {
    state.nextLine += 1
    state.isCrashing = true
  })

  t.set('die', () => {
    state.isComputerDead = true
  })

  t.play()

  document.body.classList.add('overflow--hidden')
})

onUnmounted(() => {
  document.body.classList.remove('overflow--hidden')
})
</script>

<route lang="yaml">
meta:
  layout: simple
</route>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  box-shadow: inset 120px 100px 250px #000, inset -120px -100px 250px #000;
}

.error {
  font-size: var(--text-3xl);
  text-transform: uppercase;
  letter-spacing: 10px;
}

.error .button {
  font-size: var(--text-xl);
  vertical-align: middle;
}

.content {
  position: relative;
  max-width: 500px;
}

.console {
  --hacker-color: #2eff7b;
  --console-bg: linear-gradient(to top, black, transparent);
  --border-color: #cabfa6;
  --inner-border-color: #928771;
  --controls-color: #343434;

  width: 100%;
  height: 300px;
  margin: 0;
  background: var(--console-bg);
  border-color: var(--border-color);
  border-style: solid;
  border-top-width: 30px;
  border-left-width: 30px;
  border-right-width: 30px;
  border-bottom-width: 60px;
  color: var(--hacker-color);
  border-radius: 10px;
  box-shadow: inset 0 0 0 7px var(--inner-border-color),
    inset 0 0 0 12px rgb(0 0 0 / 20%);
  position: relative;
}

.console::before {
  position: absolute;
  content: '';
  width: 70px;
  height: 10px;
  background-color: var(--controls-color);
  right: 20px;
  bottom: -35px;
}

.console::after {
  position: absolute;
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background-color: var(--controls-color);
  right: 5px;
  bottom: -32px;
}

.console--burning {
  animation: damage 1s infinite linear;
}

.console pre {
  position: relative;
  font-family: Cousine, monospace;
  font-size: 14px;
  padding-left: 30px;
  padding-bottom: 0;
  display: block;
  overflow: hidden;
  margin: 0;
}

.console pre:nth-child(1) {
  margin-top: 25px;
}

.console pre.breakline {
  padding-bottom: 12px;
}

.doge {
  position: absolute;
  left: -140px;
  bottom: -20px;
  z-index: 1;
  clip-path: circle(80px at center 84px);
}

.sweat {
  position: absolute;
  left: -90px;
  top: 213px;
  z-index: 1;
}

.credits {
  opacity: 0.5;
  margin-top: 10px;
  margin-left: 50px;
  font-size: var(--text-sm);
  text-align: right;
}

.cursor {
  display: inline-block;
  width: 5px;
  height: 15px;
  vertical-align: middle;
  background: #fff;
  animation: cursor 2s infinite linear;
  margin-left: -3px;
}

.spotlight {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.2;
  animation: spotlight 5s infinite alternate ease-in-out;
  filter: blur(3px);
  will-change: filter;
}

.swirl-enter-active {
  animation: swirl-in 3s 1s ease-out both;
  will-change: transform;
}

@keyframes swirl-in {
  0% {
    transform: rotate(-540deg) scale(0);
    opacity: 0;
  }

  100% {
    transform: rotate(0) scale(1);
    opacity: 1;
  }
}

.swirl-leave-active {
  animation: swirl-out 0.4s ease-in forwards;
  will-change: transform;
}

@keyframes swirl-out {
  0% {
    transform: rotate(0) scale(1);
    display: block;
  }

  100% {
    transform: rotate(-540deg) scale(0);
    display: none;
  }
}

@keyframes spotlight {
  0% {
    transform: rotate(350deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes damage {
  from {
    --border-color: #cabfa6;
    --inner-border-color: #928771;
  }

  to {
    --border-color: #e17373;
    --inner-border-color: #c96666;
  }
}

@keyframes cursor {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

@media (--vw-md) {
  main {
    padding: 2rem;
  }

  .doge {
    left: -67px;
    bottom: 9px;
  }

  .spotlight {
    display: none;
  }
}
</style>
