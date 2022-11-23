<template>
  <div class="card">
    <div class="card-content">
      <h1 class="title">{{ question.title }}</h1>
      <form @submit.prevent="answerQuestion">
        <div class="control" v-for="choice in question.answers" :key="choice.id">
          <label class="radio">
            <input type="radio" :value="choice.id" v-model="answer.choice" :disabled="answer.choice !== ''" />
            {{ choice.title }}
          </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      answer: {
        choice: ''
      }
    }
  },
  computed: {
    ...mapState(['question'])
  },
  methods: {
    ...mapActions(['answerQuestion']),

    async sendAnswer() {
      try {
        await this.answerQuestion(this.answer);
        this.$emit('answer');
      } catch(err) {
        console.error(err);
      }
    }
  },
  watch: {
    'answer.choice'(choice) {
      if (choice !== '') {
        this.sendAnswer();
      }
    }
  }
}
</script>


