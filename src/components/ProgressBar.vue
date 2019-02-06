<template>
  <div class="ProgressBar">
    <div class="progress">
      <div class="progress-bar bg-warning text-dark" role="progressbar" :aria-valuenow="level" :style="{width: (100 * level/max) + '%'}" :aria-valuemin="min" :aria-valuemax="max">
        {{ this.level }}/{{ this.max }}
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "ProgressBar",
    props: ["level", "max", "min"]
  }
</script>
