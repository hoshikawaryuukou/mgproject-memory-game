export interface Card {
  value: string;
  flipped: boolean;
  matched: boolean;
}

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function initializeGame(cardValues: string[]): Card[] {
  return shuffle(
    [...cardValues, ...cardValues].map((value) => ({
      value,
      flipped: false,
      matched: false,
    })),
  );
}

export function checkMatch(cards: Card[], flippedCards: number[]): boolean {
  const [firstIndex, secondIndex] = flippedCards;
  if (cards[firstIndex].value === cards[secondIndex].value) {
    cards[firstIndex].matched = true;
    cards[secondIndex].matched = true;
    return true;
  } else {
    setTimeout(() => {
      cards[firstIndex].flipped = false;
      cards[secondIndex].flipped = false;
    }, 1000);
    return false;
  }
}
