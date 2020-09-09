// This is used to shuffle the array of answers so the index of correct
// answer is not always the same
export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);