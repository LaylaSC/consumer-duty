// Consumer Duty principles and their definitions
const pairs = [
    { principle: "Act in good faith", definition: "Always act honestly and with integrity towards customers." },
    { principle: "Avoid foreseeable harm", definition: "Prevent potential harm to customers before it occurs." },
    { principle: "Enable informed decisions", definition: "Provide clear information so customers can make informed choices." },
    { principle: "Deliver good outcomes", definition: "Ensure products and services meet customer needs and expectations." },
    { principle: "Fair value", definition: "Offer products and services that are priced fairly relative to the benefits provided." },
    { principle: "Support vulnerable customers", definition: "Recognize and address the needs of customers in vulnerable circumstances." }
  ];
  
  // Duplicate and shuffle the cards
  let cards = [];
  pairs.forEach(pair => {
    cards.push({ type: 'principle', text: pair.principle, match: pair.definition });
    cards.push({ type: 'definition', text: pair.definition, match: pair.principle });
  });
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  const gameBoard = document.getElementById('gameBoard');
  let flippedCards = [];
  let lockBoard = false;
  
  function createBoard() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.type = card.type;
      cardElement.dataset.text = card.text;
      cardElement.dataset.match = card.match;
      cardElement.textContent = '';
      cardElement.addEventListener('click', flipCard);
      gameBoard.appendChild(cardElement);
    });
  }
  
  function flipCard() {
    if (lockBoard) return;
    if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
  
    this.classList.add('flipped');
    this.textContent = this.dataset.text;
    flippedCards.push(this);
  
    if (flippedCards.length === 2) {
      lockBoard = true;
      setTimeout(checkForMatch, 1000);
    }
  }
  
  function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.match === card2.dataset.text && card2.dataset.match === card1.dataset.text) {
      card1.classList.add('matched');
      card2.classList.add('matched');
    } else {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
    }
    flippedCards = [];
    lockBoard = false;
  }
  
  document.getElementById('resetButton').addEventListener('click', createBoard);
  
  // Initialize the game
  createBoard();
  