<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <font-awesome-icon icon="handshake" style="margin-right: 5px;" />
        <strong>meest</strong>
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        :class="{ 'is-active': isMenuActive }"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isMenuActive }"
    >
      <div class="navbar-start">
        <a class="navbar-item">
          Home
        </a>

        <a class="navbar-item">
          Documentation
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item is-hidden-touch">
          <div class="buttons">
            <nuxt-link to="new-meeting" class="button is-primary">
              <font-awesome-icon icon="plus" style="margin-right: 5px;"/>
              <strong>New Meeting</strong>
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="side-nav__extra is-hidden-desktop">
        <nuxt-link class="navbar-item" to="/">Dashboard</nuxt-link>
        <nuxt-link class="navbar-item" to="/new-meeting">New Meeting</nuxt-link>
        <nuxt-link class="navbar-item" to="/meeting-book">Meeting Book</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMenuActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
