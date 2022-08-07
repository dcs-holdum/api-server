export function getRandomInteger(min, max, isIncluded) {
  return Math.floor(Math.random() * (max - min + (isIncluded ? 1 : 0))) + min;
};

export function getRandomBoolean(percentage) {
  return Math.random() < percentage / 100;
};

export function increaseByPercentage(minPercentage, money) {
  const percentage = getRandomInteger(1, minPercentage, true);
  const isWin = getRandomBoolean(percentage);
  let increasePercentage;

  if (isWin) {
    increasePercentage = 100 + (100 - percentage);
  } else {
    increasePercentage = 100 - percentage;
  }

  return {
    isWin,
    percentage,
    money: money * (increasePercentage / 100),
  };
};
