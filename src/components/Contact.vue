<template>
  <div class="container">
    <h2
      class="hasHeadline"
      data-aos="flip-left"
      data-aos-easing="ease-in-out"
      data-aos-duration="1000"
    >Contato</h2>
    <section
      class="contact"
      data-aos="flip-right"
      data-aos-easing="ease-in-out"
      data-aos-duration="1000"
    >
      <form
        class="contact-form"
        name="contact"
        @submit.prevent="handleSubmit"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact-form" />
        <label for="name">Nome</label>
        <input type="text" id="name" placeholder="Seu nome" autocomplete="off" required />
        <label for="email">E-mail</label>
        <input type="email" id="email" placeholder="Seu lindo e-mail" autocomplete="off" required />
        <label for="message">Mensagem</label>
        <textarea name="message" id="message" cols="60" rows="4" required></textarea>
        <button type="submit" class="contact-form-button">
          <fa-icon :icon="['fas', 'paper-plane']"></fa-icon>Enviar Mensagem
        </button>
      </form>
    </section>
    <transition name="alert-in" v-if="showMessage">
      <p id="modal">
        <strong>&check;</strong> Obrigado por entrar em contato! Responderei assim que possível.
      </p>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMessage: false
    };
  },
  methods: {
    handleSubmit() {
      this.showMessage = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/_vars.scss";
.container {
  position: relative;
}
.container h2 {
  font-size: 3rem;
  margin-bottom: 30px;
  color: $primary-color;
  margin-top: 20px;
}

.contact {
  &-form {
    display: flex;
    flex-direction: column;
    label {
      font-size: 14px;
      color: #444;
      font-weight: bold;
      margin-bottom: 8px;
    }
    label span {
      font-weight: normal;
      color: #999;
      font-size: 12px;
    }
    input {
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 2px;
      height: 45px;
      padding: 0 15px;
      font-size: 16px;
    }
    textarea {
      margin-bottom: 20px;
      border: 1px solid #ddd;
      border-radius: 2px;
      padding: 0 15px;
      font-size: 16px;
    }
    button {
      border-radius: 2px;
      width: 100%;
      padding: 8px 20px;
      background-color: $primary-color;
      color: $white;
      transition: background 0.3s ease-in-out;
      svg {
        transition: all 0.5s ease-in-out;
        margin-right: 10px;
        opacity: 0;
        transform: translateX(-50px) scale(0.5);
      }

      &:hover {
        background: darken($primary-color, 10%);
      }
      &:hover svg {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }
    input,
    textarea,
    button {
      &:focus {
        border-color: $primary-color;
        outline: 0;
        box-shadow: 0 0 0 0.19rem rgba(65, 170, 240, 0.466);
      }
    }
  }
}

#modal {
  position: absolute;
  top: 20%;
  right: 20px;
  padding: 1rem 1rem;
  background-color: #2ecc71;
  color: $white;
  font-size: 1rem;
  border-radius: 40px;
  opacity: 1;
  animation-name: fadeIn;
  animation-delay: 1.5s;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  animation-duration: 1s;
}

@keyframes fadeIn {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media screen and (max-width: $mobile-breakpoint) {
  .container {
    h2 {
      font-size: 2rem;
    }
  }
}
</style>
