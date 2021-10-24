"use strict";

// QUEUE
class Queue {
  constructor() {
    this.items = [];
  }

  // add element to the queue
  enqueue(element) {
    return this.items.push(element);
  }

  // remove element from the queue
  dequeue() {
    if (this.items.length > 0) {
      return this.items.shift();
    }
  }

  // view the first element
  peek() {
    return this.items[0];
  }

  // check if the queue is empty
  isEmpty() {
    return this.items.length == 0;
  }

  // the size of the queue
  size() {
    return this.items.length;
  }

  // empty the queue
  clear() {
    this.items = [];
  }
}

// Get h1 element
const target = document.body.querySelector(".typewrite");
const speed = target.getAttribute("data-speed");

// Constructing Queue
let listofPhrases = JSON.parse(target.getAttribute("data-type"));
let phrasesQueue = new Queue();
listofPhrases.forEach((phrase) => {
  phrasesQueue.enqueue(phrase);
});

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

// Type effect onload
window.addEventListener("load", async () => {
  let phraseToType = phrasesQueue.peek();
  target.classList.toggle("typing");
  await typeOut(target, phraseToType, speed);
  target.classList.toggle("typing");
});

// Event listener for hover to play typewriter effect
target.addEventListener("mouseenter", async function () {
  if (!target.classList.contains("typing")) {
    target.classList.toggle("typing");
    await backSpace(target, speed, phrasesQueue);

    target.classList.toggle("typing");
  }
});

// Typewriter effect 2 components: backSpace and typeOut
async function backSpace(target, speed, phrasesQueue) {
  const originalWord = String(target.childNodes[0].nodeValue);
  for (let i = originalWord.length; i >= 1; i--) {
    let currentText = String(target.childNodes[0].nodeValue);
    target.childNodes[0].nodeValue = currentText.substring(0, i);
    await timer(speed);
  }

  let phraseToEnqueue = phrasesQueue.peek();
  phrasesQueue.dequeue();
  phrasesQueue.enqueue(phraseToEnqueue);

  let phraseToType = phrasesQueue.peek();
  await typeOut(target, phraseToType, speed);
}

async function typeOut(target, phrase, speed) {
  for (let i = 1; i < phrase.length + 1; i++) {
    target.childNodes[0].nodeValue = phrase.substring(0, i);
    await timer(speed);
  }
}
