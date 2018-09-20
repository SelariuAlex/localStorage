//var

const addItemsAction = document.querySelector(".addItems-action");
const input = document.querySelector(".addItems-input");
const submit = document.querySelector(".addItems-submit");

const list = document.querySelector(".fight-list");
const displayItemsAction = document.querySelector(".displayItems-action");
const clear = document.querySelector(".displayItems-clear");

// event listeners

submit.addEventListener("click", addItem);

// functions

function addItem(event) {
  event.preventDefault();
  let valoare = input.value;
  if (valoare === "") {
    showAction(addItemsAction, "Add tehnique", false);
  } else {
    showAction(addItemsAction, `${valoare} was added`, true);
    createItem(valoare);
  }
}

// show action
function showAction(element, text, valuare) {
  if (valuare === true) {
    element.classList.add("success");
    element.innerText = text;
    input.value = "";
    setTimeout(function() {
      element.classList.remove("success");
    }, 2000);
  } else {
    element.classList.add("alert");
    element.innerText = text;
    input.value = "";
    setTimeout(function() {
      element.classList.remove("alert");
    }, 2000);
  }
}

// create item

function createItem(valoare) {
  let parent = document.createElement("div");
  parent.classList.add("fight-item");

  parent.innerHTML = `<h4 class="fight-item__title">${valoare}</h4>
  <a href="#" class="fight-item__link">
    <i class="far fa-trash-alt"></i>
  </a>`;

  list.appendChild(parent);
}
