<template>
  <Button type="button" variant="outline" circle @click="share">
    <template #icon>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <title>Share</title>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    </template>
  </Button>
</template>

<script setup>
const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})

const share = async () => {
  if ('share' in window.navigator) {
    return await window.navigator.share({
      title: props.title ?? document.title,
      url: props.link,
    })
  }

  await window.navigator.clipboard.writeText(props.link);
}
</script>
