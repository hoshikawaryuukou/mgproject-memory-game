<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useGameStore } from '../stores/store';

  const store = useGameStore();

  onMounted(() => {
    store.resetGame();
  });
</script>

<template>
  <div class="memory-game">
    <h2>{{ store.messageTable.gameTitle }}</h2>
    <div class="grid">
      <div
        v-for="(card, index) in store.cards"
        :key="index"
        class="card"
        :class="{ flipped: card.flipped || card.matched }"
        @click="store.flipCard(index)"
      >
        <div class="card-front">{{ card.value }}</div>
        <div class="card-back"></div>
      </div>
    </div>
    <div
      v-if="store.matchedPairs === store.cards.length / 2"
      class="result"
    >
      <p>{{ store.messageTable.congrats }}</p>
      <button @click="store.resetGame">{{ store.messageTable.reset }}</button>
    </div>
  </div>
</template>

<style scoped>
  .memory-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 1em;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  .memory-game h2 {
    text-align: center;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5em;
    width: 80%;
    height: 80%;
  }
  .card {
    width: 100%;
    height: 100%;
    perspective: 1000px;
    cursor: pointer;
  }
  .card.flipped .card-front,
  .card.matched .card-front {
    transform: rotateY(0);
  }
  .card.flipped .card-back,
  .card.matched .card-back {
    transform: rotateY(180deg);
  }
  .card-front,
  .card-back {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    border-radius: 8px;
  }
  .card-front {
    background-color: #fff;
    border: 1px solid #ddd;
    transform: rotateY(180deg);
  }
  .card-back {
    background-color: #b0b0b0;
    border: 1px solid #999;
  }
  .result {
    margin-top: 1em;
    text-align: center;
  }
</style>
