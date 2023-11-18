<template>
  <svg viewBox="0 0 48 48">
    <circle cx="50%" cy="50%" r="10" fill="transparent" stroke="silver" stroke-dasharray="2">
    </circle>
    <line x1="60%" y1="50%" x2="50%" y2="50%" stroke="silver" stroke-width="1" stroke-linecap="round" />
  </svg>
</template>

<style scoped>
svg {
  animation: turn-around 50s linear infinite both;
  max-width: 48px;
}

svg circle {
  animation: offset 20s linear infinite both;
}

@keyframes offset {
  0% { stroke-dashoffset: 0; }  
  100% { stroke-dashoffset: 50; }  
}

@keyframes turn-around {
  0% { transform: rotate(0turn); }
  100% { transform: rotate(1turn); }
}
</style>