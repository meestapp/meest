<template>
  <section class="hero is-info is-fullheight">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item">
              <font-awesome-icon icon="handshake" style="margin-right: 5px;" />
              <strong>meest</strong>
            </a>
            <span class="navbar-burger burger" data-target="navbarMenuHeroC">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroC" class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item is-active">
                Home
              </a>
              <a class="navbar-item">
                Documentation
              </a>
              <span class="navbar-item">
                <a class="button is-success is-outlined is-inverted">
                  <span>Sign Up</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <nuxt />
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth">
        <div class="container">

        </div>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
};
</script>

<style lang="scss" scoped>

</style>
