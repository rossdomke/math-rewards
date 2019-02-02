<template>
  <div class="MathProblem text-center">
    <div class="text-danger" v-if="isWrong">WRONG 
      <span class="text-small text-secondary" v-if="allowedAttempts > 0"> ({{ attempts }}/{{ allowedAttempts }})</span>
    </div>
    <div class="top-number">&nbsp;{{ topNumber }}</div>
    <div class="bottom-number"><span class="operator">{{ operator }}</span> {{ bottomNumber }}</div>
    <input class="answer form-control w-100" type="number" v-model.number="answer" @keydown.enter="checkAnswer">
  </div>
</template>

<script>

export default {
  name: 'math-problem',
  props: {
    topNumber: {}, 
    bottomNumber: {}, 
    operator: {},
    allowedAttempts: {
      default: 2,
      type: Number,
    }
  },
  data: () => {
    return {
      answer: null,
      attempts: 0,
      isWrong: false,
    };
  },
  methods: {
    checkAnswer() {
      if(this.answer === null)
        return;
      this.attempts++;
      const problem = `${this.topNumber} ${this.operator} ${this.bottomNumber}`;
      const result = {
        problem,
        correctAnswer: eval(problem),
        answer: this.answer,
        correct: eval(problem) === this.answer,
        attempts: this.attempts,
      };
      this.answer = null;
      if(result.correct){
        this.emitResult(result);
      }else{
        this.isWrong = true;
        if(this.allowedAttempts !== 0 && this.attempts >= this.allowedAttempts){
          this.emitResult(result)
        }
      }
    },
    emitResult(result){
      this.isWrong = false;
      this.attempts = 0;
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