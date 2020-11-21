

const main = document.querySelector('main');
const scoreEl = document.querySelector('#score');
const animation = document.querySelector('.animation');
const showGame = document.querySelector('.showGame');
const intro = document.querySelector('.intro');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
var congrats = document.getElementById('congrats');
const closeBtn = document.getElementById('close');
const question = document.getElementById('question');
const playAgain = document.getElementById('playAgain');
const clickHere = document.getElementById('clickhere');
var congratulations = document.getElementById('congratulations');
var randG = 100;
var isGreen = false;

var correct = [
  'Good job!',
  'Correct!',
  `That's right!`,
  `You're really smart!`,
  'You got it!',
  'Yes!',
  'Nice job!',
];
function saySomething(phrase) {
  var polly = new AWS.Polly();
  var params = {
    OutputFormat: 'mp3',
    Text: phrase,
    TextType: 'text',
    VoiceId: 'Justin',
  };

  polly.synthesizeSpeech(params, function (err, data) {
    if (err) {
      // an error occurred
      console.log(err, err.stack);
    } else {
      var uInt8Array = new Uint8Array(data.AudioStream);
      var arrayBuffer = uInt8Array.buffer;
      var blob = new Blob([arrayBuffer]);

      var audio = $('audio');
      var url = URL.createObjectURL(blob);
      audio[0].src = url;
      audio[0].play();
    }
  });
}

var score = 0;
muted = false;
function animalSound(sound) {
  var animalNoise = new Audio(sound);
  animalNoise.play();
}
var endTheme = new Audio('./sounds/endtheme.mp3');
var theme = new Audio('./sounds/mario.mp3');
theme.volume = 0.2;
function playYay() {
  var yay = new Audio('./sounds/yay.mp3');
  yay.volume = 0.5;
  yay.play();
}

function playBoo() {
  var boo = new Audio('./sounds/boo.mp3');
  var boo2 = new Audio('./sounds/boo2.mp3');
  var boo3 = new Audio('./sounds/boo3.mp3');
  var rand = Math.floor(Math.random() * 3);

  if (rand === 0) {
    boo.play();
  } else if (rand === 1) {
    boo2.play();
  } else if (rand === 2) {
    boo3.play();
  }
}

async function getAnimalInfo() {
  let response = await fetch(` http://www.fieldscope.org/api/`, {
    method: 'GET',
  });
  let data = await response.json();
  data = JSON.stringify(data);
  data = JSON.parse(data);
  return data;
}

async function useAnimalInfo() {
  let info = await getAnimalInfo();
  console.log(info);
}

useAnimalInfo();
const data = [
  {
    image: './img/gator.png',
    text: 'Alligator',
    mp3: './sounds/alligator.mp3',
    diet: 'carnivore',
  },
  {
    image: './img/penguin.png',
    text: 'Penguin',
    mp3: './sounds/penguin.mp3',
    diet: 'carnivore',
  },
  {
    image: './img/bird.png',
    text: 'Birdy',
    mp3: './sounds/bird.mp3',
    diet: 'omnivore',
  },
  {
    image: './img/pig.png',
    text: 'Piggy',
    mp3: './sounds/pig.mp3',
    diet: 'omnivore',
  },
  {
    image: './img/bunny.png',
    text: 'Bunny',
    mp3: './sounds/bunny.mp3',
    diet: 'herbivore',
  },
  {
    image: './img/chicken.png',
    text: 'Chicken',
    mp3: './sounds/chicken.mp3',
    diet: 'omnivore',
  },
  {
    image: './img/dog.png',
    text: 'Dog',
    mp3: './sounds/dog.mp3',
    diet: 'omnivore',
  },
  {
    image: './img/hippo.png',
    text: 'Hippo',
    mp3: './sounds/hippo.mp3',
    diet: 'omnivore',
  },
  {
    image: './img/koala.png',
    text: 'Koala',
    mp3: './sounds/koala.mp3',
    diet: 'herbivore',
  },
  {
    image: './img/lion.png',
    text: 'Lion',
    mp3: './sounds/lion.mp3',
    diet: 'carnivore',
  },
  {
    image: './img/mouse.png',
    text: 'Mouse',
    mp3: './sounds/mouse.mp3',
    diet: 'omnivore',
  },
  {
    image: './img/sheep.png',
    text: 'Sheep',
    mp3: './sounds/sheep.mp3',
    diet: 'herbivore',
  },
  {
    image: './img/frog.png',
    text: 'Froggy',
    mp3: './sounds/frog.mp3',
    diet: 'omnivore',
  },
  {
    image: './img/giraffe.png',
    text: 'Giraffe',
    mp3: './sounds/deer.mp3',
    diet: 'omnivore',
  },
  {
    image: './img/goat.png',
    text: 'Goat',
    mp3: './sounds/goat.mp3',
    diet: 'herbivore',
  },
  {
    image: './img/fox.png',
    text: 'Fox',
    mp3: './sounds/fox.mp3',
    diet: 'omnivore',
  },
  {
    image: './img/deer.png',
    text: 'Deer',
    mp3: './sounds/deer.mp3',
    diet: 'herbivore',
  },
];

shuffle(data);
// Randomizers
var db2 = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);

console.log(db2);
let randomData = [data[0], data[1], data[2], data[3], data[4], data[5]];
let randomFromArray = Math.floor(Math.random() * 6);
question.innerHTML = `<h1>Where's the ${randomData[randomFromArray].text}?</h1>`;
randomData.forEach(createBox);

function newQuestion() {
  randomData = [data[6], data[7], data[8], data[9], data[10], data[11]];

  randomFromArray = Math.floor(Math.random() * 6);
  question.innerHTML = `<h1>Where's the ${randomData[randomFromArray].text}?</h1>`;
  randomData.forEach(createBox);
  shuffle(data);
  saySomething(`Where's the  ${randomData[randomFromArray].text}?`);
}

function reloadPage() {
  location.reload();
}

function win() {
  saySomething('Congratulations! You win!');
  congratulations.style.display = 'block';

  setInterval(function () {
    if (randG == 100) {
      isGreen = false;
    } else if (randG == 255) {
      isGreen = true;
    }

    if (isGreen) {
      randG--;
    } else {
      randG++;
    }

    congrats.style = `color: rgb(0, ${randG}, 255)`;
  }, 8);
  main.innerHTML = ``;
  question.innerHTML = ``;
  theme.pause();
  endTheme.play();

  playAgain.innerHTML = `<h2>Play again!</h2>`;
}
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text, mp3 } = item;

  box.classList.add('box');

  box.innerHTML = `
        <img src="${image}" alt="${text}" />
        
    `;

  box.addEventListener('pointerdown', function () {
    box.style.backgroundColor = 'rgba(77, 192, 177, 0.95)';
  });
  box.addEventListener('pointerup', function () {
    box.style.backgroundColor = 'rgba(101, 255, 234, 0.95)';
  });

  box.addEventListener('click', () => {
    localStorage.setItem('data', JSON.stringify(data));
    animalSound(mp3);
    var myVar;
    if (text === randomData[randomFromArray].text) {
      saySomething(correct[Math.floor(Math.random() * 6)]);
      score += 1;
      setTimeout(function () {
        box.classList.add('rotateBox');
      }, 1000);
      setTimeout(function () {
        main.classList.add('clearScreen');
      }, 2000);
      setTimeout(function () {
        main.innerHTML = ``;
      }, 3000);
      setTimeout(function () {
        main.classList.remove('clearScreen');
      }, 3000);
      setTimeout(function () {
        box.classList.remove('rotateBox');
      }, 3000);
      playYay();
      // setTimeout(reloadPage, 4000)

      console.log(randomData[randomFromArray].text);
      console.log(score);
      if (score === 10) {
        setTimeout(win, 3000);
      } else {
        scoreEl.innerHTML = `<h2>SCORE: ${score}`;
        setTimeout(newQuestion, 3000);
      }
    } else {
      // playBoo();
    }

    // Add active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });
  // @todo - speak event

  main.appendChild(box);
}

// Play again
playAgain.addEventListener('click', function () {
  congratulations.style.display = 'none';
  score = 0;
  endTheme.pause();
  theme.play();
  newQuestion();
  animation.innerHTML = ``;
  playAgain.innerHTML = ``;
  scoreEl.innerHTML = `<h2>SCORE: ${score}`;
});

// Click here
clickHere.addEventListener('click', () => {
  intro.style.display = 'none';
  showGame.style.display = 'block';
  setTimeout(function () {
    theme.play();
  }, 200);
  saySomething(`Where's the ${randomData[randomFromArray].text}?`);
});
// Score
scoreEl.innerHTML = `<h2>SCORE: ${score}`;

// setInterval(function () {
//   document.querySelector('body').classList.remove('scrollLeft');
//   document.querySelector('body').classList.add('scrollRight');
//   setTimeout(function () {
//     document.querySelector('body').classList.remove('scrollRight');
//     document.querySelector('body').classList.add('scrollLeft');
//   }, 3000);
// }, 6000);
