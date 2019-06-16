/* eslint-disable no-shadow */
const SET_EMPLOYEES = 'SET_EMPLOYEES';

export const state = () => ({
  employees: [],
});

export const mutations = {
  [SET_EMPLOYEES](state, payload) {
    state.employees = payload;
  },
};

export const actions = {
  async getMyEmployees({ commit }) {
    const employees = await this.$axios.$get('/api/users/team');
    commit(SET_EMPLOYEES, employees);
    return employees;
  },
};
