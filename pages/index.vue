<template>
  <div class="container">
    <interview-start v-if="!started" @user-id-received="lookForQuestion" />
    <interview-question v-else-if="!no_question" @answer="lookForQuestion" :key="question.id" />
    <interview-results v-else-if="results.total_result" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  async asyncData({ store }) {
    await store.dispatch('getCountries');
    await store.dispatch('getVisaTypes');
    return {
      started: false
    }
  },
  computed: {
    ...mapState(['user_id', 'question', 'no_question', 'results'])
  },
  methods: {
    ...mapActions(['getQuestion','getResults']),

    async lookForQuestion() {
      await this.getQuestion();
      if (this.no_question) {
        await this.getResults();
      }
      if (!this.started) {
        this.started = true;
      }
    }
  }
}
</script>

<style lang="css" scoped>

</style>
