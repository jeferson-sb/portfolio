<template>
  <div ref="canvasContainer" class="canvas-container" aria-hidden="true">
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, useTemplateRef } from 'vue'

const defaults = defineProps({
  quantity: {
    type: Number,
    default: 400,
  },
  staticity: {
    type: Number,
    default: 20,
  },
  ease: {
    type: Number,
    default: 50,
  },
  size: {
    type: Number,
    default: 1,
  },
  vx: {
    type: Number,
    default: 0,
  },
  vy: {
    type: Number,
    default: 1,
  }
})

const containerRef = useTemplateRef('canvasContainer')
const canvasRef = useTemplateRef('canvas')
const context = ref(null)
const dpr = window.devicePixelRatio || 1
const canvasSize = ref({ w: 0, h: 0 })
const circles = ref([])
const mouse = ref({ x: 0, y: 0 })
const mousePosition = ref({ x: 0, y: 0 })

const handleMouseMove = (event) => {
  mousePosition.value = { x: event.clientX, y: event.clientY }
}

const onMouseMove = () => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const x = mousePosition.value.x - rect.left - canvasSize.value.w / 2
  const y = mousePosition.value.y - rect.top - canvasSize.value.h / 2
  const inside = x < canvasSize.value.w / 2 && x > -canvasSize.value.w / 2 && y < canvasSize.value.h / 2 && y > -canvasSize.value.h / 2
  if (inside) {
    mouse.value.x = x
    mouse.value.y = y
  }
}

const resizeCanvas = () => {
  if (!containerRef.value || !canvasRef.value || !context.value) return

  circles.value = []
  canvasSize.value.w = containerRef.value.offsetWidth
  canvasSize.value.h = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight, document.documentElement.offsetHeight) - 80;
  canvasRef.value.width = canvasSize.value.w * dpr
  canvasRef.value.height = canvasSize.value.h * dpr
  canvasRef.value.style.width = `${canvasSize.value.w}px`
  canvasRef.value.style.height = `${canvasSize.value.h}px`
  context.value.scale(dpr, dpr)
}

const circleParams = () => {
  const x = Math.floor(Math.random() * canvasSize.value.w)
  const y = Math.floor(Math.random() * canvasSize.value.h)
  const pSize = Math.floor(Math.random() * 2) + defaults.size
  const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1))
  const dx = (Math.random() - 0.5) * 0.1
  const dy = (Math.random() - 0.5) * 0.1
  const magnetism = 0.1 + Math.random() * 4
  return {
    x,
    y,
    translateX: 0,
    translateY: 0,
    size: pSize,
    alpha: 0,
    targetAlpha,
    dx,
    dy,
    magnetism,
  }
}

const clearContext = () => {
  context.value?.clearRect(0, 0, canvasSize.value.w, canvasSize.value.h)
}

const drawCircle = (circle, update = false) => {
  if (!context.value) return
  const { x, y, translateX, translateY, size } = circle
  context.value.translate(translateX, translateY)
  context.value.beginPath()
  context.value.arc(x, y, size, 0, 2 * Math.PI)
  context.value.fillStyle = `rgba(100, 100, 100, 1)`
  context.value.fill()
  context.value.setTransform(dpr, 0, 0, dpr, 0, 0)

  if (!update) circles.value.push(circle)
}

const drawParticles = () => {
  clearContext()
  for (let i = 0; i < defaults.quantity; i++) {
    drawCircle(circleParams())
  }
}

const remapValue = (value, start1, end1, start2, end2) =>
  Math.max(((value - start1) * (end2 - start2)) / (end1 - start1) + start2, 0)

const animate = () => {
  clearContext()
  circles.value.forEach((circle, i) => {
    const edge = [
      circle.x + circle.translateX - circle.size,
      canvasSize.value.w - circle.x - circle.translateX - circle.size,
      circle.y + circle.translateY - circle.size,
      canvasSize.value.h - circle.y - circle.translateY - circle.size,
    ]
    const closestEdge = Math.min(...edge)
    const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2))

    if (remapClosestEdge > 1) {
      circle.alpha += 0.02
      if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha
    } else {
      circle.alpha = circle.targetAlpha * remapClosestEdge
    }

    circle.x += circle.dx + defaults.vx
    circle.y += circle.dy + defaults.vy

    circle.translateX +=
      (mouse.value.x / (defaults.staticity / circle.magnetism) - circle.translateX) / defaults.ease
    circle.translateY +=
      (mouse.value.y / (defaults.staticity / circle.magnetism) - circle.translateY) / defaults.ease

    drawCircle(circle, true)

    if (
      circle.x < -circle.size ||
      circle.x > canvasSize.value.w + circle.size ||
      circle.y < -circle.size ||
      circle.y > canvasSize.value.h + circle.size
    ) {
      circles.value.splice(i, 1)
      drawCircle(circleParams())
    }
  })
  window.requestAnimationFrame(animate)
}

const initCanvas = () => {
  resizeCanvas()
  drawParticles()
  animate()
}

onMounted(() => {
  if (canvasRef.value) {
    context.value = canvasRef.value.getContext("2d")
  }
  window.addEventListener("mousemove", handleMouseMove)
  window.addEventListener("resize", initCanvas)

  initCanvas()
})

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove)
  window.removeEventListener("resize", initCanvas)
})

watch(() => [mousePosition.value.x, mousePosition.value.y], onMouseMove)
</script>

<style scoped>
.canvas-container {
  --color: var(--color-default-white);
  position: absolute;
  inset: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  z-index: var(--z-hide);
}

.canvas {
  width: 100%;
  height: 100%;
}
</style>
