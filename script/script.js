const form = document.querySelector('form');
const total = document.querySelector('.total');
const amount = document.querySelector('.amount');

form.addEventListener('input', onInput);
form.addEventListener('click', onClick);


const obj = {};

form.onkeydown = function(e) {
  if (e.target.dataset.period == undefined) return;

  if ( !isFinite(e.key) && e.key !== "." && 
    e.code !== 'Backspace') {
    e.preventDefault();
  }

  if (e.key == '.' && e.target.dataset.period == 'true') {
    e.preventDefault();
    return;
  }

  if (e.key == '.') {
    e.target.dataset.period = true;
  }
}

function onInput(e) {
  if (e.target.dataset.period == undefined) return;
  let div = e.target.closest('div');
  
  if (!e.target.value) {
    e.target.dataset.period = false;
  }

  if (div.classList.contains('invalid')) {
    e.target.closest('div').classList.remove('invalid');
  }
  
  if (e.target.id) {
    obj[e.target.id] = +e.target.value;
  }
 
  if (e.target.name == 'custom') {
    obj.tip = +e.target.value;
  }
}


function onClick(e) {
  if (e.target.type == 'reset') {
    
    for (let input of form.elements) {
      if (input.dataset.period !== undefined) {
        input.dataset.period = false;
      }
    }

    amount.textContent = '$0.00'
    total.textContent = '$0.00';
  }

  const tip = e.target.closest('#tip');
  if (tip && e.target.name !== 'custom') {
    obj.tip = parseInt(e.target.value);
    e.target.closest('#tip').firstElementChild.className = '';
  }
  
  if (e.target.type == 'button') {
    calculate();
  }
}

function calculate() {
  let people = document.querySelector('#people');
  let tip = document.querySelector('#tip').firstElementChild;

  let pdiv = people.closest('div');

  if (!obj.tip) tip.className = 'invalid';

  if (!obj.bill) return;
  
  if (!obj.people) {
    pdiv.classList.add('invalid');
    return;
  }

  let amountPerPerson = (obj.bill * (obj.tip / 100)) / obj.people;
  let grandTotal = (obj.bill + (obj.bill * (obj.tip / 100))) / obj.people;
  amount.textContent = '$' + amountPerPerson.toFixed(2);
  total.textContent = '$' + grandTotal.toFixed(2);
}
