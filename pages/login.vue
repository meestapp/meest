<template>
  <div class="columns container is-centered">
    <div
      class="column is-6-desktop is-4-fullhd is-centered box"
    >
      <h1 class="title is-2">Sign in</h1>
      <input
        v-model="email"
        class="input"
        type="text"
        placeholder="Email"
      >
      <input
        v-model="password"
        class="input"
        type="password"
        placeholder="Password"
      >
      <a class="button is-info is-fullwidth is-large" @click="login">Login</a>
      <div class="signup">
        New in meest? <strong>Sign up now</strong>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password,
        },
      }).catch((e) => {
        console.error('Login error: ', e);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  background-color: rgba(1,1,1,0.2);
  padding: 2.5rem;
  height: 32rem;
}
input {
  padding: 0.75rem;
  margin-top: 0.75rem;
}
.button {
  margin-top: 2.5rem;
}
.signup {
  bottom: 2.5rem;
  position: absolute;
  color: white;
  strong {
    color: white;
  }
}
.is-centered {
  margin: 0 auto;
}
</style>
