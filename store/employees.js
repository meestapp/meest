/* eslint-disable no-shadow */
import employees from '~/exampleData/employees.json';

const SET_EMPLOYEES = 'SET_EMPLOYEES';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
    await timeout(1000);
    commit(SET_EMPLOYEES, employees);
    return employees;
  },
};
