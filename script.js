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
  locale: 'en-GB',
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
  locale: 'en-US',
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
  locale: 'en-GB',
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
  locale: 'en-US',
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
const formatCur = function(value,locale){
  return new Intl.NumberFormat(locale,{
    style: 'currency',
    currency: 'UGX',

  }).format(value);

}

const displayChoices = function(acc){
  containerMovements.innerHTML = '';

    acc.choices.forEach(function(choice, i){

      const formattedPrice = formatCur(choice.price,acc.locale);
     
      
        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--deposit">${i+1}<img class="chicken" src="${choice.image}"/></div>
         <div class="movements__date">${choice.name}</div>
         <div class="movements__value">${formattedPrice}</div>
        </div>`;
        containerMovements.insertAdjacentHTML('afterbegin',html);
        
    });

};

const calcDisplayTotal = function(acc){
  const total = acc.choices.reduce((acc, choice) => acc + choice.price, 0);
  labelBalance.textContent = formatCur(total,acc.locale);;
};


const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map((name) => name[0]).join('');
 
});
};
  
createUsernames(accounts);
const updateUI = function(acc){
  displayChoices(acc);
  calcDisplayTotal(acc);
}

const startLogOutTimer =function(){
  const tick = function(){
    const min = String(Math.trunc(time/60)).padStart(2,0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    

    if(time === 0){
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    time--;
  };
  let time = 30;


  tick();

  const timer = setInterval(tick, 1000);
  return timer;
};


let currentAccount, timer;


// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`

btnLogin.addEventListener('click', function(e){
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);


if(currentAccount?.pin === Number(inputLoginPin.value)) {
  labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
  containerApp.style.opacity = 100;

  const now = new Date();
  const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  // weekday: "long",
 }
// const locale = navigator.language;
// console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);


  // clear input fields
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
// timer = startLogOutTimer();
  
  // Display Choices
 updateUI(currentAccount);
}
});


