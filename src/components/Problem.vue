<template>
  <div class="Problem">

    <div class="top-number">&nbsp;{{ topNumber }}</div>
    <div class="bottom-number"><span class="operator">{{ operator }}</span> {{ bottomNumber }}</div>
    <input class="answer" :class="{ wrong: isWrong}" type="number" v-model.number="answer" @keydown.enter="checkAnswer">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'problem',
  props: {
    topNumber: Number,
    bottomNumber: Number,
    operator: String,

  },
  data: () => {
    return {
      answer: null as number | null,
      isWrong: Boolean,
    };
  },
  methods: {
    checkAnswer() {
      const result = {answer: this.answer, correct: false};
      this.answer = null;
      if (eval(`${this.topNumber} ${this.operator} ${this.bottomNumber}`) === result.answer) {
        result.correct = true;
      }
      this.$emit('get-result', result);
    },
  },
});
</script>
<style lang="scss">
</style>