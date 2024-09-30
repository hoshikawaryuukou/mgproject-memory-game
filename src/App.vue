<script setup lang="ts">
  import GameEntry from './components/component.vue';
</script>

<template>
  <div class="container">
    <GameEntry />
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    aspect-ratio: 2 / 3;
    max-height: 100%;
    max-width: 100%;
    margin: auto;
  }
</style>
