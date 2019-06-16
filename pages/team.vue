<template>
  <main class="column">
    <p class="title">
      Your team
    </p>
    <table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth has-text-centered"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Team</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.name">
          <th>{{ employee.name }}</th>
          <th>{{ employee.team }}</th>
          <td>{{ employee.salary }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Team',
  computed: {
    ...mapState('employees', [
      'employees',
    ]),
  },
  mounted() {
    this.getMyEmployees();
  },
  methods: {
    ...mapActions('employees', [
      'getMyEmployees',
    ]),
  },
};
</script>

<style scoped>

</style>
