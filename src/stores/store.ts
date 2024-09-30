import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';
import { Card, checkMatch, initializeGame } from '../models/model';

export interface MessageTable {
  gameTitle: string;
  congrats: string;
  reset: string;
}

export const useGameStore = defineStore('memoryGame', () => {
  const messageTable: MessageTable = {
    gameTitle: 'Memory Game',
    congrats: 'Congratulations! You won!',
    reset: 'Reset Game',
  };
  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cards = ref<Card[]>(initializeGame(cardValues));
  const flippedCards = ref<number[]>([]);
  const matchedPairs = ref(0);

  function flipCard(index: number) {
    if (flippedCards.value.length < 2 && !cards.value[index].flipped) {
      cards.value[index].flipped = true;
      flippedCards.value.push(index);
      if (flippedCards.value.length === 2) {
        if (checkMatch(cards.value, flippedCards.value)) {
          matchedPairs.value++;
        }
        flippedCards.value = [];
      }
    }
  }

  function resetGame() {
    cards.value = initializeGame(cardValues);
    flippedCards.value = [];
    matchedPairs.value = 0;
  }

  return {
    messageTable,
    cards,
    flippedCards,
    matchedPairs,
    flipCard,
    resetGame,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
