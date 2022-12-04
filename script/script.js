const form = document.querySelector('form');
const tip = document.querySelector('.tip');
const people = document.querySelector('.people');
const bill = document.querySelector('.bill');
const finishButtons = document.querySelector('.buttons');
const amount = document.querySelector('.amount');
const total = document.querySelector('.total');

window.addEventListener('load', loader);

const values = {
  bill: null,
  tip: null,
  people: null
};

form.oninput = function(event) {
  const target = event.target;
  inputNumOnly(target);
  makeValid(target);
  values[target.dataset.name] = +target.value || null; 
}

tip.onclick = function(event) {
  const target = event.target;
  makeValid(target);
  if (target.className !== 'tip__button') return;
  values[target.dataset.name] = parseInt(target.value) || null;
}

finishButtons.onclick = function(event) {
  if (event.target.className == 'calc') {
    if (!values.people) people.classList.add('invalid');
    if (!values.tip) tip.classList.add('invalid');
    if (!values.bill) bill.classList.add('invalid');
    calculate();
  } else {

    for (let prop in values) {
      values[prop] = null;
    }

    amount.textContent = '$0.00';
    total.textContent = '$0.00';

  }
}

function loader() {
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.classList.add('loader--hidden');
  }, 2000);

  document.addEventListener('transitionend', () => {
    loader.remove();
  });
}

function inputNumOnly(elem) {
  const value = elem.value.replace(/[^0-9.]/g, '');
  elem.value = value.replace(/(\.\d*)\.\d*/g, "$1");
}

function makeValid (elem) {
  const check = elem.closest('div').classList.contains('invalid');
  if (check) {
    elem.closest('div').classList.remove('invalid');
  }
}

function calculate() {
  for (let prop in values) {
    if (!values[prop]) return;
  }

  const {bill, tip, people} = values;
  const percentTageOfBill = (bill * tip / 100);
  const tipAmount = percentTageOfBill / people;
  const grandTotal = (bill + percentTageOfBill) / people;
  
  amount.textContent = '$' + tipAmount.toFixed(2);
  total.textContent = '$' + grandTotal.toFixed(2);
}