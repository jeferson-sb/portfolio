<template>
  <div class="mouse-scroll">
    <div class="mouse">
      <span class="mouse-in"></span>
    </div>
  </div>
</template>

<style scoped>
.mouse-scroll {
  position: absolute;
  margin: auto;
  left: 50%;
  top: 65%;
  transform: translateX(-50%);
}

.mouse-scroll .mouse {
  height: 56px;
  width: 23px;
  border-radius: 10px;
  border: 2px solid var(--text-color-default, --color-default-white);
}

.mouse-scroll .mouse .mouse-in {
  height: 9px;
  width: 3px;
  border-radius: 5rem;
  display: block;
  margin: 5px auto;
  background: var(--text-color-default, --color-default-white);
  animation: mouse-animated 2s ease-in-out 0.4s infinite;
}

@keyframes mouse-animated {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
