const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const generateRandomNumbersThatSumTo8 = (): number[] => {
    const numbers: number[] = [];
    let sum = 0;
  
    while (sum < 8) {
      let remaining = 8 - sum;
  
      // If the remaining sum is less than 2, we force it to 1
      if (remaining < 2) {
        numbers.push(remaining);  // Push 1 to make the sum exactly 8
        sum += remaining;          // Update the sum to 8
      } else {
        const randomNumber = getRandomNumber(2, 4);
        
        if (sum + randomNumber <= 8) {
          numbers.push(randomNumber);
          sum += randomNumber;
        }
      }
    }
  
    return numbers;
  }
  
  const generateRandomNumbers = (totalLength: number): number[] => {
    let result: number[] = [];
  
    while (result.length < totalLength) {
      const set = generateRandomNumbersThatSumTo8();
  
      result = result.concat(set);
  
      if (result.length > totalLength) {
        result = result.slice(0, totalLength);
      }
    }
  
    return result;
  }
  
  export { generateRandomNumbers }
  