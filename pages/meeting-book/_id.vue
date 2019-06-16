<template>
  <div class="columns">
    Hi!
    {{ meeting }}
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'MeetingBookId',
  data() {
    return {
      meeting: {},
    };
  },
  async beforeMount() {
    this.meeting = await this.getMeeting(this.$route.params.id);
  },
  methods: {
    ...mapActions('meetings', [
      'getMeeting',
    ]),
  },
};
</script>

<style lang="scss" scoped>

</style>
