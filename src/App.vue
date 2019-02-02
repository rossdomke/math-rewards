<template>
  <div id="app" class="container">
    <bs-indicator></bs-indicator>
    <div class="row">
      <div class="col-12" v-if="answerHistory.length < settings.math.maxProblems">
        <div class="row">
          <div class="col-12 col-sm-5 col-md-4 col-lg-3 mx-auto">
            <heart-box :max-hearts="maxHearts" :current-hearts="hearts"></heart-box>
            <progress-bar></progress-bar>
            <math-problem :top-number="problem.topNumber" :bottom-number="problem.bottomNumber" :operator="problem.operator"
              @get-answer="getAnswer"></math-problem>
            <p>Correct: {{ correct.length }}</p>
            <h3 class="m-0 text-primary">History</h3>
            <hr class="bg-primary w-100 m-0" />
            <div class="history">
              <div class="history-shade"></div>
              <ul class="p-0">
                <li v-for="(answer, idx) in answerHistory" :key="idx" :class="[ answer.correct ? 'text-success' : 'text-danger' ]">
                  <span class="text-primary">#{{ answerHistory.length - (idx) }}.&nbsp;&nbsp;</span>
                  {{ answer.problem }} =
                  <span :class="{ 'line-through' : !answer.correct }">&nbsp;{{ answer.answer }}&nbsp;</span>
                  <span v-if="!answer.correct" class="text-success">&nbsp;&nbsp;({{ answer.correctAnswer }})</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 text-center" v-else>
        All Done <br/>
        You got {{ correct.length }} correct.<br/>
        You got {{ answerHistory.length - correct.length }} wrong.<br/>
        You have earned {{ Math.round(correct.length * (15/60)) }} minutes.<br/>
        
        <div class="btn btn-warning" @click="answerHistory = []">Reset</div>
      </div>
    </div>
  </div>
</template>

<script>
  import BsIndicator from './components/BsIndicator.vue';
  import MathProblem from './components/MathProblem.vue';
  import HeartBox from './components/HeartBox.vue';
  import ProgressBar from './components/ProgressBar.vue';
  import {
    MathSettings
  } from './data/settings.js'
  export default {
    name: 'app',
    components: {
      BsIndicator,
      MathProblem,
      HeartBox,
      ProgressBar,
    },
    props: {
      maxHearts: {
        default: 3,
        type: Number
      },
      startingHearts: {
        default: 3,
        type: Number,
      }
    },
    data() {
      return {
        settings: {
          math: MathSettings
        },
        answerHistory: [],
        problem: {},
      };
    },
    created() {
      this.generateNumbers();
    },
    methods: {
      generateNumbers() {
        const setting = this.settings.math.operators[Math.floor(Math.random() * this.settings.math.operators.length)];
        let numbers = [];
        numbers.push(Math.floor(Math.random() * setting.max + setting.min));
        numbers.push(Math.floor(Math.random() * setting.max + setting.min));
        if (this.settings.math.highestOnTop) {
          numbers.sort((a, b) => {
            return a > b ? 1 : -1
          });
        }
        const problem = {
          topNumber: numbers[1],
          bottomNumber: numbers[0],
          operator: setting.operator,
        }
        this.problem = problem;
      },
      getAnswer(result) {
        this.answerHistory.unshift(result);
        this.generateNumbers();
      },
    },
    computed: {
      correct() {
        return this.answerHistory.filter((h) => {
          return h.correct
        })
      },
      hearts() {
        let hearts = this.startingHearts;
        let consecCorrect = 0;
        const awardHeartAt = 2;

        for(let i = this.answerHistory.length - 1; i >= 0; i--){
          let problem = this.answerHistory[i];
          if(problem.correct){
            consecCorrect++;
            if(consecCorrect === awardHeartAt && hearts < this.maxHearts){
              consecCorrect = 0;
              hearts++;
            }
          }else{
            consecCorrect = 0;
            hearts--;
          }
        }
        return hearts;
      },
    }
  }
</script>

<style lang="scss">
  @import './scss/main.scss';

  body {
    background-color: $dark;
    color: $white;
  }

  .line-through {
    text-decoration: line-through !important;
  }

  .history {
    position:relative;
    z-index:5;
    max-height: 200px;
    overflow: hidden;
    .history-shade{
      position: absolute;
      z-index: 10;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, transparent, $dark);
    }
    li {
      list-style-type: none;
      margin: 4px 0 0 0;
    }
  }
</style>