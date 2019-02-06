<template>
  <div class="history">
    <div class="history-shade"></div>
    <ul class="p-0">
      <li v-for="(answer, idx) in problems" :key="idx" :class="[ answer.correct ? 'text-success' : 'text-danger' ]">
        <span class="text-primary">#{{ problems.length - (idx) }}.&nbsp;&nbsp;</span>
        {{ answer.problem }} =
        <span :class="{ 'line-through' : !answer.correct }">&nbsp;{{ answer.answer }}&nbsp;</span>
        <span v-if="!answer.correct" class="text-success">&nbsp;&nbsp;({{ answer.correctAnswer }})</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'history',
    props: ['problems']
  }
</script>
<style lang="scss">
  @import '../scss/main.scss';
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