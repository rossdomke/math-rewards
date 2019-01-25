<template>
  <div class="Game">
    
    <Problem
      :top-number="topNumber"
      :bottom-number="bottomNumber"
      :operator="'-'"
      @get-result="getResult"
    ></Problem>
    <button class="skip" @click="skip">Skip</button>
    <div class="correctAnswers">
      <h4>Number Correct</h4>
      <h5>{{ correctAnswers }}</h5>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Problem from '../components/Problem.vue';

export default Vue.extend({
  name: 'game',
  components: { Problem },
  data() {
    return {
      minNumber: 1,
      maxNumber: 19,
      numbers: [] as number[],
      answer: null as number | null,
      correctAnswers: 0,
      isWrong: false,
    };
  },
  beforeMount() {
    this.generateNumbers();
  },
  methods: {
    getResult(result: {answer: number, correct: boolean}) {
      const numbers = this.numbers;
      this.generateNumbers();
    },
    skip() {
      if (this.correctAnswers > 0) {
        this.correctAnswers--;
      }
      this.generateNumbers();
    },
    checkAnswer() {
      if (this.answer === this.correctAnswer) {
        this.correctAnswers++;
        this.answer = null;
        this.generateNumbers();
        this.isWrong = false;
      } else {
        this.isWrong = true;
      }
    },
    generateNumbers() {
      this.numbers = [];
      this.numbers.push(Math.floor(Math.random() * this.maxNumber + this.minNumber));
      this.numbers.push(Math.floor(Math.random() * this.maxNumber + this.minNumber));
    },
  },
  computed: {
    correctAnswer(): number {
      return this.topNumber - this.bottomNumber;
    },
    topNumber(): number {
      const nums = this.numbers.slice();
      return nums.sort((a: number, b: number) => {
        return b - a;
      })[0];
    },
    bottomNumber(): number {
      const nums = this.numbers.slice();
      return nums.sort((a: number, b: number) => {
        return a - b;
      })[0];
    },
  },
});
</script>
<style lang="scss">
 
</style>