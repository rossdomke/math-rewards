<template>
  <div id="app" class="container mt-1">
    <div class="row">
      <div class="col-12" v-if="answerHistory.length < settings.math.maxProblems">
        <div class="row">
          <div class="col-12 col-sm-5 col-md-4 col-lg-4 mx-auto">
            <progress-bar v-if="answerHistory.length" class="d-inline-block float-right w-100 mt-3" :min="0" :level="answerHistory.length" :max="settings.math.maxProblems"></progress-bar>
            <heart-box class="" :max-hearts="settings.math.maxHearts" :current-hearts="hearts"></heart-box>
            <math-problem :top-number="problem.topNumber" :bottom-number="problem.bottomNumber" :operator="problem.operator"
              @get-answer="getAnswer"></math-problem>
            <p>Correct: {{ correct.length }}</p>
            <h3 class="m-0 text-primary">History</h3>
            <hr class="bg-primary w-100 m-0" />
            <history :problems="answerHistory"></history>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto" v-else>
        <h1 class="text-primary display-3 bg-secondary p-2 rounded text-center">All Done</h1>
        <div class="w-100 clearfix">
          <heart-box class="d-inline-block float-left" :max-hearts="settings.math.maxHearts" :current-hearts="hearts"></heart-box> 
          <span class="float-right text-warning" style="font-size: 2em;">{{ multiplier }}x</span>
        </div>
        <div class="w-100">
          <h3 class="text-success m-0">{{ correct.length }} Correct</h3>
          <history :problems="correct"></history>
          <hr class="w-100 bg-primary" />
        </div>
        <div class="w-100">
          <h3 class="text-danger m-0">{{ wrong.length }} Wrong</h3>
          <p class="text-danger m-0">Review the problems below</p>
          <history :problems="wrong"></history>
          <hr class="w-100 bg-primary" />
        </div>
        <div class="w-100 text-info">
          <h3 class="text-warning m-0">Results</h3>
          <ul class="results">
            <li class="text-primary">&nbsp;&nbsp;&nbsp;{{ correct.length }} correct </li>
            <li class="text-warning">x {{ Math.round(settings.math.problemValue *100)/100 }} min/problem</li>
            <li class="hr"></li>
            <li class="text-primary">&nbsp;&nbsp;&nbsp;{{ Math.round(minutesEarned * 100) /100}} minutes earned</li>
            <li class="text-danger">x {{ multiplier }} multiplier</li>
            <li class="hr"></li>
            <li class="text-success">&nbsp;&nbsp;&nbsp;{{ Math.round(100 * totalMinutesEarned)/100 }} minutes total</li>
          </ul>
        </div>
        <div class="btn btn-warning btn-block my-5" @click="answerHistory = []">Reset</div>
      </div>
    </div>
  </div>
</template>

<script>
  import MathProblem from './components/MathProblem.vue';
  import HeartBox from './components/HeartBox.vue';
  import ProgressBar from './components/ProgressBar.vue';
  import History from './components/History.vue';
  import {
    MathSettings
  } from './data/settings.js'
  export default {
    name: 'app',
    components: {
      MathProblem,
      HeartBox,
      ProgressBar,
      History,
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
        numbers.push(Math.floor(Math.random() * (setting.max - setting.min) + setting.min));
        numbers.push(Math.floor(Math.random() * (setting.max - setting.min) + setting.min));
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
      wrong(){
        return this.answerHistory.filter((h) => {
          return !h.correct
        });
      },
      minutesEarned() {
        return this.correct.length * this.settings.math.problemValue;
      },
      totalMinutesEarned(){
        return this.minutesEarned * this.multiplier;
      },
      multiplier(){
        if(this.hearts < 1){
          return this.settings.math.minMultiplier;
        }

        const mult = (this.hearts + 1)/2
        return mult;
      },
      hearts() {
        let hearts = this.settings.math.startingHearts;
        let consecCorrect = 0;
        const awardHeartAt = this.settings.math.awardHeartAt;

        for(let i = this.answerHistory.length - 1; i >= 0; i--){
          let problem = this.answerHistory[i];
          if(problem.correct){
            consecCorrect++;
            if(consecCorrect === awardHeartAt && hearts < this.settings.math.maxHearts){
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
  ul.results{
    list-style-type: none;
    padding: 0;
    width: 60%;
    margin: auto;
    font-size: 1.25em;
    li.hr{
      height:3px;
      width: 100%;
      background-color: $info;
    }
  }
 
</style>