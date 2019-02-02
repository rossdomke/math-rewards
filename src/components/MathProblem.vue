<template>
  <div class="MathProblem text-center">

    <div class="top-number">&nbsp;{{ topNumber }}</div>
    <div class="bottom-number"><span class="operator">{{ operator }}</span> {{ bottomNumber }}</div>
    <input class="answer form-control w-100" type="number" v-model.number="answer" @keydown.enter="checkAnswer">
  </div>
</template>

<script lang="ts">

export default {
  name: 'math-problem',
  props: ['topNumber', 'bottomNumber', 'operator'],
  data: () => {
    return {
      answer: null,
    };
  },
  methods: {
    checkAnswer() {
      if(this.answer === null)
        return;
      const problem = `${this.topNumber} ${this.operator} ${this.bottomNumber}`;
      const result = {
        problem,
        correctAnswer: eval(problem),
        answer: this.answer,
        correct: eval(problem) === this.answer,
      };
      this.answer = null;
      this.$emit('get-answer', result);
    },
  },
};
</script>
<style lang="scss">
.top-number,.bottom-number{
  font-size: 2em;
}
</style>