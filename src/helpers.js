 const getRandomIndex = (min, max) => {
   min = Math.ceil(min);
   max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
 }


export const shuffleArray = (a) => {
  var array = a;

  for(let i = array.length - 1; i > 0; i--) {
    const j = getRandomIndex(0, i);

    // swap
    const t = array[j];
    array[j] = array[i];
    array[i] = t;
  }

  return array;
}

export const decodeTriviaData = (input) => {
  let doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
}
