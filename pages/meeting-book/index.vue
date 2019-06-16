<template>
  <div class="column">
    <p class="title">
      Meeting Book
    </p>
    <div class="columns">
      <div v-for="meeting in meetings" :key="meeting._id" class="card column is-4">
        <header class="card-header">
          <p class="card-header-title">
            {{ meeting.title }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            {{ getDate(meeting.startedAt) }}
          </div>
        </div>
        <footer class="card-footer">
          Organizer: {{ meeting.organizer.name }} {{ meeting.organizer.lastName }}
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'MeetingBook',
  computed: {
    ...mapState('meetings', [
      'meetings',
    ]),
  },
  async beforeMount() {
    await this.getMyMeetings();
  },
  methods: {
    ...mapActions('meetings', [
      'getMyMeetings',
    ]),
    getDate(ts) {
      return new Date(ts).toLocaleString();
    },
  },
};
</script>

<style scoped>
.card-footer {
  padding: 0.75rem;
}
</style>
