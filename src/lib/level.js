// This function returns a object that the requirements value such as percentage and money by level
export function getNeed(level) {
  const percentage = 100 - 10 * level;
  const money = 5000 * (level + 1);

  return {
    percentage,
    money,
  };
}
