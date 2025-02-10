<template>
  <button ref="coffeeButton" class="coffee-button" type="button" aria-label="Give a coffee" @click="onClick">
    <CoffeeSVG class="coffee" width="40" height="40" />
  </button>
</template>

<script setup>
import { inject, ref, watch } from 'vue';

const points = inject('points')
const coffeeButton = ref(null);

const pieces = [
  { piece: 'cup', animation: 'bounce-in' },
  { piece: 'liquid', animation: 'scale-out' },
  { piece: 'vapor', animation: 'slide-in-blurred' },
];
const pointsLimit = pieces.length;

const toggle = (element, className) => {
  const svg = coffeeButton?.value?.firstChild
  svg.querySelector(`.${element}`).classList.toggle(className);
}

watch(
  points,
  (newValue, oldValue) => {
    // When coffee points persisted show those pieces
    if (oldValue === 0 && newValue < pointsLimit) {
      pieces.forEach(({ piece }, index) => {
        if (index + 2 > newValue) {
          toggle(piece, 'opacity-0');
        }
      })
    }

    // Show piece by piece
    if (newValue >= 1 && newValue <= pointsLimit) {
      // TODO: Show "+1 ⚡" everytime the coffee is pressed
      // TODO: Change animation of swiggles
      const el = pieces[newValue - 1]
      toggle(el.piece, 'opacity-0')
      toggle(el.piece, el.animation)
    }
  },
  { immediate: true }
)

const onClick = () => {
  if (points.value < pointsLimit) points.value++
}
</script>

<style>
.coffee-button {
  border: 0;
  background: transparent;
}

.opacity-0 {
  opacity: 0;
}

.coffee {
  .plate {
    transition: transform 300ms ease-in;
  }

  .liquid {
    transform-origin: center;
  }

  &:hover {
    .plate {
      animation: wobble-hor-bottom 700ms normal both;
    }
  }
}

/* Animations */
.scale-out {
  animation: scale-out 500ms ease-out normal forwards;
}

.bounce-in {
  animation: bounce-in-top 1s normal forwards;
}

.slide-in-blurred {
  animation: slide-in-blurred 1s cubic-bezier(0.230, 1.000, 0.320, 1.000) forwards;
}

/* Keyframes */
@keyframes scale-out {
  0% {
    transform: scale(0.3);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-in-top {
  0% {
    transform: translateY(-100%);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  35% {
    transform: translateY(0);
    animation-timing-function: ease-out;
    opacity: 0.5;
  }

  50% {
    transform: translateY(-65px);
    animation-timing-function: ease-in;
    opacity: 1;
  }

  70% {
    transform-origin: center;
    transform: translateY(0) rotate(14deg);
    animation-timing-function: ease-out;
  }

  80% {
    transform: translateY(-28px);
    animation-timing-function: ease-in;
  }

  90% {
    transform-origin: center;
    transform: translateY(0) rotate(-14deg);
    animation-timing-function: ease-out;
  }

  100% {
    transform-origin: center;
    transform: rotate(0);
  }
}

@keyframes slide-in-blurred {
  0% {
    transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
    transform-origin: 50% 100%;
    filter: blur(40px);
    opacity: 0;
  }

  100% {
    transform: translateY(0) scaleY(1) scaleX(1);
    transform-origin: 50% 50%;
    filter: blur(0);
    opacity: 1;
  }
}

@keyframes wobble-hor-bottom {

  0%,
  100% {
    transform: translateX(0%);
    transform-origin: 50% 50%;
  }

  15% {
    transform: translateX(-30px) rotate(-6deg);
  }

  30% {
    transform: translateX(15px) rotate(6deg);
  }

  45% {
    transform: translateX(-15px) rotate(-3.6deg);
  }

  60% {
    transform: translateX(9px) rotate(2.4deg);
  }

  75% {
    transform: translateX(-6px) rotate(-1.2deg);
  }
}
</style>
