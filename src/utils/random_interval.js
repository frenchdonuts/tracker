var atLeast = 60 * 10;
var atMost = 60 * 60;

function* shouldCheckGen(min, max) {
  var randomNumber = getRandomInt(min, max); 
  while (true) {
    if (randomNumber === 0) {
      randomNumber = getRandomInt(min, max);
      yield true;
    } else {
      randomNumber = randomNumber - 1;
      yield false;
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default (shouldCheckGen(atLeast, atMost));
