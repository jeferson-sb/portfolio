<template>
  <Layout>
    <div class="container">
      <p class="modal"><strong>&check;</strong> {{ $t('contact.reply') }}</p>
      <div style="width:100%;height:0;padding-bottom:75%;position:relative;">
        <iframe
          src="https://giphy.com/embed/nEMmyUp4hl1QOzovKh"
          width="100%"
          height="100%"
          style="position:absolute"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        <a href="https://giphy.com/gifs/mrw-and-pain-nEMmyUp4hl1QOzovKh"
          >via GIPHY</a
        >
      </p>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
.container {
  width: 40%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
}

.modal {
  margin: 10% auto;
  max-width: 500px;
  padding: 1rem 1rem;
  background-color: #2ecc71;
  color: var(--color-default-white);
  font-size: 1rem;
  border-radius: 40px;
  opacity: 0;
  animation: fadeIn 0.5s 1s normal forwards ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media screen and (max-width: 425px) {
  .container {
    width: 90%;
  }
}
</style>
