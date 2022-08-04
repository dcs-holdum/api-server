export function getRandomInteger(min, max, isIncluded) {
  return Math.floor(Math.random() * (max - min + (isIncluded ? 1 : 0))) + min;
};

export function getRandomBoolean(percentage) {
  return Math.random() < percentage / 100;
};

export function increaseByPercentage(percentage, money) {
  const isWin = getRandomBoolean(percentage);
  let increasePercentage;

  if (isWin) {
    increasePercentage = 100 + (100 - percentage);
  } else {
    increasePercentage = 100 - percentage;
  }

  return {
    isWin,
    money: money * increasePercentage,
  };
};
