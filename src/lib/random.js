// This function returns the random integer by minimum, maximum and whether this function include the maximum number
export function getRandomInteger(min, max, isIncluded) {
  return Math.floor(Math.random() * (max - min + (isIncluded ? 1 : 0))) + min;
}

// This function returns the true or false by percentage
export function getRandomBoolean(percentage) {
  return Math.random() < percentage / 100;
}

// This function returns a results about betting
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
}
