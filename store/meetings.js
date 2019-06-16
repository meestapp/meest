/* eslint-disable no-shadow */
import Vue from 'vue';

const SET_DRAFT = 'SET_DRAFT';
const SET_DRAFT_TITLE = 'SET_DRAFT_TITLE';
const SET_DRAFT_DESCRIPTION = 'SET_DRAFT_DESCRIPTION';
const SET_DRAFT_PARTICIPANT = 'SET_DRAFT_PARTICIPANT';
const UNSET_DRAFT_PARTICIPANT = 'UNSET_DRAFT_PARTICIPANT';
const DELETE_DRAFT = 'DELETE_DRAFT';
const SET_MEETING = 'SET_MEETING';

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
    draft.id = Math.floor(Math.random() * 1000);
    draft.startedAt = (new Date()).getTime();
    draft.finishedAt = 0;
    commit(SET_MEETING, draft);
    dispatch('deleteDraft');
    return draft.id;
  },
};
