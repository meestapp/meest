<template>
  <main class="column">
    <p class="title">
      New Meeting
      <span
        v-if="Object.entries(draft).length !== 0 && draft.constructor === Object"
        class="tag is-primary"
      >Draft</span>
    </p>
    <div class="columns">
      <div class="column box">
        <div
          v-if="Object.entries(draft).length !== 0 && draft.constructor === Object"
          class="block column is-marginless is-pulled-right"
        >
          <span class="tag is-danger">
            Discard draft
            <button class="delete is-small" @click="deleteDraft"></button>
          </span>
        </div>
        <p class="subtitle column is-marginless">
          Title
        </p>
        <div class="column is-full padding-top-0">
          <input
            class="input is-primary"
            type="text"
            placeholder="Ex: Quarter objectives"
            :value="draft.title"
            @input="setDraftTitle($event.target.value)"
          />
        </div>
        <p class="subtitle column is-marginless">
          Description
        </p>
        <MarkdownEditor
          class="padding-top-0"
          :md-input="draft.description || '#### Set your own description'"
          @input="setDraftDescription"
        />
        <p class="subtitle column is-marginless">
          Participants
        </p>
        <Participants
          class="padding-top-0"
          :participants="draft.participants"
          @checked="setDraftParticipant"
          @unchecked="unsetDraftParticipant"
        />
        <TagsInput
          :tags="draft.tags"
          @changed="setDraftTags"
        />
        <div class="column is-full">
          <a
            class="button is-primary"
            @click="startMeeting"
          >Start Meeting</a>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MarkdownEditor from '~/components/MarkdownEditor.vue';
import Participants from '~/components/Participants.vue';
import TagsInput from '~/components/TagsInput.vue';

export default {
  name: 'NewMeeting',
  components: {
    MarkdownEditor,
    Participants,
    TagsInput,
  },
  computed: {
    ...mapState('meetings', [
      'draft',
    ]),
  },
  methods: {
    ...mapActions('meetings', [
      'setDraftTitle',
      'setDraftDescription',
      'setDraftParticipant',
      'unsetDraftParticipant',
      'setDraftTags',
      'deleteDraft',
      'newMeetingFromDraft',
    ]),
    async startMeeting() {
      const newDraftId = await this.newMeetingFromDraft();
      this.$router.push({
        path: `/meeting-book/${newDraftId}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.padding-top-0 {
  padding-top: 0;
}
</style>
