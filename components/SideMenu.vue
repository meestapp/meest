<template>
  <div class="column is-2 is-fullheight">
    <aside class="menu">
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li><nuxt-link to="/">Dashboard</nuxt-link></li>
        <li><nuxt-link to="new-meeting">New Meeting</nuxt-link></li>
        <li><nuxt-link to="meeting-book">Meeting Book</nuxt-link></li>
      </ul>
      <p class="menu-label">
        Administration
      </p>
      <ul class="menu-list">
        <li><nuxt-link to="team">Team</nuxt-link></li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'SideMenu',
};
</script>

<style scoped>
</style>
