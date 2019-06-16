/* eslint-disable no-shadow */
import Vue from 'vue';

const SET_DRAFT = 'SET_DRAFT';
const SET_DRAFT_TITLE = 'SET_DRAFT_TITLE';
const SET_DRAFT_DESCRIPTION = 'SET_DRAFT_DESCRIPTION';
const SET_DRAFT_PARTICIPANT = 'SET_DRAFT_PARTICIPANT';
const UNSET_DRAFT_PARTICIPANT = 'UNSET_DRAFT_PARTICIPANT';
const DELETE_DRAFT = 'DELETE_DRAFT';
const SET_MEETING = 'SET_MEETING';
const SET_MY_MEETINGS = 'SET_MY_MEETINGS';

export const state = () => ({
  meetings: [],
  draft: {
    title: '',
    description: '',
    participants: [],
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
  [DELETE_DRAFT](state) {
    Vue.set(state, 'draft', {});
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
  deleteDraft({ commit }) {
    commit(DELETE_DRAFT);
  },
  async newMeetingFromDraft({ state, commit, dispatch }) {
    const { draft } = state;
    draft.startedAt = (new Date()).getTime();
    const newMeetingId = await this.$axios.$post('/api/meetings/', {
      meeting: {
        ...draft,
      },
    });
    commit(SET_MEETING, draft);
    dispatch('deleteDraft');
    return newMeetingId;
  },
  async getMyMeetings({ commit }) {
    const { meetings } = await this.$axios.$get('/api/meetings');
    if (meetings.length === 0) return [];
    commit(SET_MY_MEETINGS, meetings);
    return meetings;
  },
  // eslint-disable-next-line no-unused-vars
  async getMeeting({ commit }, meetingId) {
    console.log(meetingId);
    const { meeting } = await this.$axios.$get(`/api/meetings/${meetingId}`);
    return meeting;
  },
};
