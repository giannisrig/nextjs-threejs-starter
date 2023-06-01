const sameArrays = (array1: string[], array2: string[]) => {
  // Check if the arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  if (array1.length === 0 && array2.length === 0) {
    return true;
  }

  // Sort the arrays to ensure the elements are in the same order
  const sortedArray1 = array1.slice().sort();
  const sortedArray2 = array2.slice().sort();

  // Compare each element in the sorted arrays
  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== sortedArray2[i]) {
      return false;
    }
  }

  return true;
};

export default sameArrays;
