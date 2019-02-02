<template>
  <div class="HeartBox">
    <span class="" v-for="i in maxHearts" :key="i">
      <i class="fa-heart" :class="[ i <= currentHearts ? 'fas text-danger' : 'far text-secondary']" ></i>
    </span>
    
  </div>
</template>

<script>
  export default {
    name: "heart-box",
    props: ['maxHearts', 'currentHearts'],
  }
</script>
<style type="scss">
  .HeartBox {
    font-size: 2em;
  }
</style> 