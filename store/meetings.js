/* eslint-disable no-shadow */
import Vue from 'vue';

const SET_DRAFT = 'SET_DRAFT';
const SET_DRAFT_TITLE = 'SET_DRAFT_TITLE';
const SET_DRAFT_DESCRIPTION = 'SET_DRAFT_DESCRIPTION';
const SET_DRAFT_PARTICIPANT = 'SET_DRAFT_PARTICIPANT';
const UNSET_DRAFT_PARTICIPANT = 'UNSET_DRAFT_PARTICIPANT';
const SET_DRAFT_TAGS = 'SET_DRAFT_TAGS';
const DELETE_DRAFT = 'DELETE_DRAFT';
const SET_MEETING = 'SET_MEETING';
const SET_MY_MEETINGS = 'SET_MY_MEETINGS';

export const state = () => ({
  meetings: [],
  draft: {
    title: '',
    description: '',
    participants: [],
    tags: [],
  },
});

export const mutations = {
  [SET_DRAFT](state, draft) {
    Vue.set(state, 'draft', draft);
  },
  [SET_DRAFT_TITLE](state, title) {
    Vue.set(state.draft, 'title', title);
  },
  [SET_DRAFT_DESCRIPTION](state, description) {
    Vue.set(state.draft, 'description', description);
  },
  [SET_DRAFT_PARTICIPANT](state, participant) {
    state.draft.participants.push(participant);
  },
  [UNSET_DRAFT_PARTICIPANT](state, participant) {
    state.draft.participants.splice(
      state.draft.participants.findIndex(element => element === participant),
    );
  },
  [SET_DRAFT_TAGS](state, tags) {
    state.draft.tags = tags;
  },
  [DELETE_DRAFT](state) {
    Vue.set(state, 'draft', {
      title: '',
      description: '',
      participants: [],
      tags: [],
    });
  },
  [SET_MEETING](state, meeting) {
    state.meetings.unshift(meeting);
  },
  [SET_MY_MEETINGS](state, meetings) {
    Vue.set(state, 'meetings', meetings);
  },
};

export const actions = {
  setDraftTitle({ commit }, title = '') {
    commit(SET_DRAFT_TITLE, title);
  },
  setDraftDescription({ commit }, description = '') {
    commit(SET_DRAFT_DESCRIPTION, description);
  },
  setDraftParticipant({ commit }, participant) {
    commit(SET_DRAFT_PARTICIPANT, participant);
  },
  unsetDraftParticipant({ commit }, participant) {
    commit(UNSET_DRAFT_PARTICIPANT, participant);
  },
  setDraftTags({ commit }, tags) {
    commit(SET_DRAFT_TAGS, tags);
  },
  deleteDraft({ commit }) {
    commit(DELETE_DRAFT);
  },
  async newMeetingFromDraft({ state, dispatch }) {
    const { draft } = state;
    const draftToSave = Object.assign({}, draft);
    draftToSave.startedAt = (new Date()).getTime();
    draftToSave.tags = draftToSave.tags.map(tag => tag.text);
    try {
      const newMeetingId = await this.$axios.$post('/api/meetings/', {
        meeting: {
          ...draftToSave,
        },
      });
      dispatch('deleteDraft');
      return newMeetingId;
    } catch (e) {
      throw e;
    }
  },
  async getMyMeetings({ commit }) {
    try {
      const { meetings } = await this.$axios.$get('/api/meetings');
      commit(SET_MY_MEETINGS, meetings);
      return meetings;
    } catch (e) {
      throw e;
    }
  },
  // eslint-disable-next-line no-unused-vars
  async getMeeting({ commit }, meetingId) {
    try {
      const { meeting } = await this.$axios.$get(`/api/meetings/${meetingId}`);
      return meeting;
    } catch (e) {
      throw e;
    }
  },
};
