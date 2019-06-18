<template>
  <div class="columns is-multiline">
    <div v-for="employee in employees" :key="employee.name" class="column is-narrow">
      <label class="checkbox">
        <input
          v-model="checkedParticipants"
          type="checkbox"
          :value="employee"
          @change="changedCheckbox(employee, $event.target.checked)"
        >
          {{ employee.name }}
      </label>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Participants',
  props: {
    participants: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {
      checkedParticipants: [],
    };
  },
  computed: {
    ...mapState('employees', [
      'employees',
    ]),
  },
  watch: {
    participants() {
      this.checkedParticipants = this.participants;
    },
  },
  mounted() {
    this.getMyEmployees();
    this.checkedParticipants = this.participants;
  },
  methods: {
    ...mapActions('employees', [
      'getMyEmployees',
    ]),
    changedCheckbox(employee, checked) {
      if (checked) this.$emit('checked', employee);
      if (!checked) this.$emit('unchecked', employee);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
