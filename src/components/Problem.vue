<template>
  <div class="Problem">

    <div class="top-number">&nbsp;{{ topNumber }}</div>
    <div class="bottom-number">- {{ bottomNumber }}</div>
    <div class="line"></div>
    <input class="answer" :class="{ wrong: isWrong}" type="number" v-model.number="answer" @keydown.enter="checkAnswer">
    <button class="skip" @click="skip">Skip</button>
    <div class="correctAnswers">
      <h4>Number Correct</h4>
      <h5>{{ correctAnswers }}</h5>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'problem',
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
  .Game {
    font-size: 4em;
    width: 200px;
    margin: auto;
    text-align: center;
  }

  .line {
    border-bottom: 1px solid black;
  }

  .answer {
    font-size: 2em;
    width: 100%;
    margin: 3px 0 3px 0;
    text-align: center;
  }

  h4 {
    font-size: 22px;
    margin: 0;
    padding: 0;
  }

  h5 {
    font-size: 18px;
    color: darkgreen;
    margin: 0;
    padding: 0;
  }

  .wrong {
    color: red;
  }

  .skip {
    width: 100%;
    padding: 5px;
    text-align: center;
    background-color: #C03221;
    color: #F7F7FF;
    font-weight: bold;
    font-size: 20px;
    border: 0px solid black;
    border-radius: 3px;
  }
</style>