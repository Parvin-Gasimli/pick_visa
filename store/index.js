export const state = () => ({
  countries: [],
  visatypes: [],
  user_id: null,
  question: {},
  answer: {},
  results: {},
  no_question: false
});


export const actions = {
  async getCountries({ commit }) {
    const res = await this.$axios.$get('/countries');
    commit('setCountries', res);
  },
  async getVisaTypes({ commit }) {
    const res = await this.$axios.$get('/visatypes');
    commit('setVisaTypes', res);
  },
  async getUserId({ commit }, form) {
    const res = await this.$axios.$post('/start', form);
    commit('setUserId', res);
  },
  async getQuestion({ commit, state }) {
    const res = await this.$axios.$get('/question?inid=' + state.user_id);
    commit('setQuestion', res);
  },
  async answerQuestion({ commit, state }, answer) {
    const res = await this.$axios.$post('/question?inid=' + state.user_id, answer);
    commit('setAnswer', res);
  },
  async getResults({ commit, state }) {
    const res = await this.$axios.$get('/results?inid=' + state.user_id);
    commit('setResults', res);
  }
}

export const mutations = {
  setCountries(state, res) {
    if (!res.data) return;
    state.countries = res.data;
  },
  setVisaTypes(state, res) {
    if (!res) return;
    state.visatypes = res;
  },
  setUserId(state, res) {
    if (!res.data) return;
    state.user_id = res.data.inid;
  },
  setQuestion(state, res) {
    if (!res) return;
    if (res.message === 'no_question') {
      state.no_question = true;
    } else if (res.data) {
      state.question = res.data;
    }
  },
  setAnswer(state, res) {
    if (!res.data) return;
    state.answer = res.data;
  },
  setResults(state, res) {
    if (!res.data) return;
    state.results = res.data;
  }
}