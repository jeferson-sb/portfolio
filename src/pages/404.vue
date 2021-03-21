<template>
  <main>
    <transition name="swirl">
      <div v-if="!isComputerDead" class="content">
        <g-image
          src="@/assets/img/meme.png"
          alt="Doge"
          class="doge"
          width="200"
        />
        <g-image
          src="@/assets/img/water_drop.png"
          alt="water drop"
          class="sweat"
          width="30"
          v-if="isCrashing"
        />

        <div :class="consoleStyles">
          <pre>me@cia ~ $ {{ commandHistory[0] || prompt }} <span class="cursor" v-show="nextLine === 1"></span></pre>
          <pre
            v-show="nextLine >= 2"
          >Enter password: {{ commandHistory[1] || prompt }} <span class="cursor" v-show="nextLine === 2"></span></pre>
          <pre
            v-show="nextLine >= 3"
          >mysql> {{ commandHistory[2] || prompt }}<span class="cursor" v-show="nextLine === 3"></span></pre>
          <pre class="breakline" v-show="nextLine >= 4">uh-oh....</pre>
          <pre class="breakline" v-show="nextLine >= 5">
[ERROR] ... beep boop ...</pre
          >
        </div>

        <p class="credits">
          (Credits for the console illustration to
          <g-link to="https://codepen.io/joseluisq">Jose Quintana</g-link>)
        </p>
      </div>
      <h1 v-else class="error">
        Not found
        <Button to="/" variant="outline">Go back home</Button>
      </h1>
    </transition>
    <SpotLightSVG class="spotlight" />
  </main>
</template>

<script>
import SpotLightSVG from '@/assets/svg/spotlight.svg'
import Button from '@/components/ui/Button.vue'

export default {
  components: {
    SpotLightSVG,
    Button,
  },
  metaInfo() {
    return {
      title: '404 Not Found',
    }
  },
  data() {
    return {
      speed: 100,
      errorDelay: 6000,
      prompt: '',
      commandHistory: [],
      commands: ['mysql -u root -p', '*******', 'DELETE FROM secret_stuff'],
      nextLine: 1,
      gen: null,
      isComputerDead: false,
      isCrashing: false,
    }
  },
  mounted() {
    document.querySelector('body').classList.add('overflow--hidden')

    this.gen = this.typeCommands()
    this.gen.next()

    const t = this.timeline({ start: this.errorDelay })
    t.set('message1', () => {
      this.nextLine += 1
    })
    t.set('message2', () => {
      this.nextLine += 1
      this.isCrashing = true
    })
    t.set('die', () => {
      this.isComputerDead = true
    })
    t.play()
  },
  computed: {
    consoleStyles() {
      return {
        console: true,
        'console--burning': this.isCrashing,
      }
    },
  },
  methods: {
    typing(command) {
      let i = 0
      const timer = setInterval(() => {
        if (i < command.length) {
          this.prompt += command.charAt(i)
          i += 1
        } else {
          clearInterval(timer)
          this.commandHistory.push(this.prompt)
          this.prompt = ''
          if (this.commandHistory.length < this.commands.length) {
            this.nextLine += 1
            this.gen.next()
          }
        }
      }, this.speed)
    },
    *typeCommands() {
      yield this.typing(this.commands[0])
      yield this.typing(this.commands[1])
      yield this.typing(this.commands[2])
    },
    timeline({ start }) {
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
    },
  },
}
</script>

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
    inset 0 0 0 12px rgba(0, 0, 0, 0.2);
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
  font-family: 'Cousine', monospace;
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
  font-weight: 700;
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
}

.swirl-enter-active {
  animation: swirl-in 3s 1s ease-out both;
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

@media screen and (max-width: 768px) {
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
