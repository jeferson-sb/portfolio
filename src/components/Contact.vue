<template>
  <div class="container">
    <h2
      class="hasHeadline"
      data-aos="flip-left"
      data-aos-easing="ease-in-out"
      data-aos-duration="700"
    >
      {{ $t('contact.title') }}
    </h2>
    <section class="contact">
      <form
        class="contact-form"
        name="contact"
        method="POST"
        @submit.prevent="handleSubmit"
        action="/success/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <label for="name">{{ $t('contact.name') }}</label>
        <input
          type="text"
          id="name"
          :placeholder="$t('contact.n_placeholder')"
          autocomplete="off"
          v-model="formData.name"
          required
        />
        <label for="email">E-mail</label>
        <input
          type="email"
          id="email"
          :placeholder="$t('contact.e_placeholder')"
          autocomplete="off"
          v-model="formData.email"
          required
        />
        <label for="message">{{ $t('contact.message') }}</label>
        <textarea
          name="message"
          id="message"
          cols="60"
          rows="4"
          v-model="formData.message"
          required
        ></textarea>
        <button type="submit" class="contact-form-button">
          <fa-icon :icon="['fas', 'paper-plane']"></fa-icon
          >{{ $t('contact.send') }}
        </button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
    },
    handleSubmit(e) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({
          'form-name': e.target.getAttribute('name'),
          ...this.formData,
        }),
      })
        .then(() => this.$router.push('/success'))
        .catch(error => alert(error));
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.container h2 {
  font-size: 3rem;
  margin-bottom: 30px;
  color: var(--color-primary);
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
      background-color: var(--color-primary);
      color: var(--color-default-white);
      transition: background 0.3s ease-in-out;
      svg {
        transition: all 0.5s ease-in-out;
        margin-right: 10px;
        opacity: 0;
        transform: translateX(-50px) scale(0.5);
      }

      &:hover {
        background: darken(hsl(204, 85%, 60%), 10%);
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
        border-color: var(--color-primary);
        outline: 0;
        box-shadow: 0 0 0 0.19rem rgba(65, 170, 240, 0.466);
      }
    }
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
