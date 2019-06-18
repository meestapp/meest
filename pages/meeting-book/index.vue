<template>
  <div class="column">
    <p class="title">
      Meeting Book
    </p>
    <div class="tile is-ancestor">
      <div v-for="meeting in meetings" :key="meeting._id" class="tile is-parent is-6">
        <div class="tile is-child card">
          <header class="card-header">
            <p class="card-header-title">
              {{ meeting.title }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="excerpt" v-html="getCompiledMarkdown(meeting.excerpt)"></div>
              <div class="content__extra">
                <div>📅 {{ getDate(meeting.startedAt) }}</div>
                <div>⏰ {{ getDuration(meeting.startedAt, meeting.finishedAt) }}</div>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            🌝 {{ meeting.organizer.name }} {{ meeting.organizer.lastName }}
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import marked from 'marked';

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
    msToTime(duration) {
      let seconds = Math.floor((duration / 1000) % 60);
      let minutes = Math.floor((duration / (1000 * 60)) % 60);
      let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? `0${hours}` : hours;
      minutes = (minutes < 10) ? `0${minutes}` : minutes;
      seconds = (seconds < 10) ? `0${seconds}` : seconds;

      return `${hours}:${minutes}:${seconds}`;
    },
    getDuration(startTs, finishTs) {
      if (finishTs < startTs) return 'Running...';
      const duration = finishTs - startTs;
      return this.msToTime(duration);
    },
    getCompiledMarkdown(md = '') {
      return marked(md, {
        renderer: this.$markedCustomRenderer,
        sanitize: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tile.is-ancestor {
  flex-wrap: wrap;
}
.card-content {
  height: 100%;
}
.card-content > .content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-content > .content > .content__extra {
  margin-top: 1.5rem;
}
.card-footer {
  padding: 0.75rem;
}
.tile.is-child.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
