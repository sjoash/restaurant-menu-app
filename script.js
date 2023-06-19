'use strict';


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Joel Kawesa',
  // choices: ['CrispyChicken', 'Burger', 'Hotdog', 'Hamburger', 'Burrito', 'Milkshake', 'Donuts'],
  choices: [{
   
    name:"Crispy Chicken",
    image:"./images/chicken.png",
    price: 17500
  },{
   
  name:"Burger",
  image:"./images/burger.png",
  price: 22000
},
],
  pin: 1111,
};

const account2 = {
  owner: 'D{avis Omara',
  choices: [{
    name:"Fish & Chips",
    price: 18000

}, {
  name:"FriedChicken",
  price: 17500
}, {
  name:"Kebab",
  price: 10000
}, {
  name:"Ribs",
  price: 35000
}, {
  name:"Nuggets",
  price: 20000
}, {
  name:"VeggieBurger",
  price: 26000
}],
  pin: 2222,
};

const account3 = {
  owner: 'George Williams',
  choices: [{
    name:"Hotdog",
    price: 20000
  }, {
    name:"Burrito",
    price: 20000
}, {
  name:"Donuts",
  price: 10000
 },{
  name: "SandwichWrap",
  price: 30000
}, {
  name:"Frenchfries",
  price: 25000
}, {
  name:"Coffee",
  price: 8000
}],
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Hakwins',
  choices: [{
    name:"Sushi",
    image:"./images/sushi.png",
    price: 15000
  }, {
    name:"Ricenoodles",
    image:"./images/Rice Noodles.png",
    price: 20000
  }, {
    name:"Taco",
    image:"./images/Taco.png",
    price: 12000
}, {
  name:"Friedeggs",
  images:"./images/Fried Eggs.png",
  price: 10000
}],
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Display
const displayChoices = function(choices){
  containerMovements.innerHTML = '';

    choices.forEach(function(choice, i){
        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--deposit">${i+1}<img class="chicken" src="${choice.image}"/></div>
         <div class="movements__date">${choice.name}</div>
         <div class="movements__value">${choice.price}</div>
        </div>`;
        containerMovements.insertAdjacentHTML('afterbegin',html);
        
    });

};
displayChoices(account1.choices);
const calcDisplayTotal = function(choices){
  const total = choices.reduce((acc, choice) => acc + choice.price, 0);
  labelBalance.textContent = `${total}`;
};


const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map((name) => name[0]).join('');
 
});
};
  
createUsernames(accounts);
const updateUI = function(acc){
  displayChoices(acc.choices);
  calcDisplayTotal(acc.choices);
}

let currentAccount;
btnLogin.addEventListener('click', function(e){
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

if(currentAccount?.pin === Number(inputLoginPin.value)) {
  labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
  containerApp.style.opacity = 100;

  // clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  // Display Choices
 updateUI(currentAccount);
}
});


