//var

const addItemsAction = document.querySelector(".addItems-action");
const input = document.querySelector(".addItems-input");
const submit = document.querySelector(".addItems-submit");

const list = document.querySelector(".fight-list");
const displayItemsAction = document.querySelector(".displayItems-action");
const clear = document.querySelector(".displayItems-clear");

// event listeners

submit.addEventListener("click", addItem);

document.addEventListener("DOMContentLoaded", displayStorage);

clear.addEventListener("click", removeItems);

list.addEventListener("click", removeSingleItem);

// functions

function addItem(event) {
  event.preventDefault();
  let valoare = input.value;
  if (valoare === "") {
    showAction(addItemsAction, "Add tehnique", false);
  } else {
    showAction(addItemsAction, `${valoare} was added`, true);
    createItem(valoare);
    updateStorage(valoare);
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

//update storage

function updateStorage(valoare) {
  let fightList;
  let exists = localStorage.getItem("fightList");

  if (exists) {
    fightList = JSON.parse(localStorage.getItem("fightList"));
  } else {
    fightList = [];
  }
  fightList.push(valoare);
  localStorage.setItem("fightList", JSON.stringify(fightList));
}

//display local storage

function displayStorage() {
  let exists = localStorage.getItem("fightList");

  if (exists) {
    let storageItems = JSON.parse(localStorage.getItem("fightList"));
    storageItems.forEach(element => {
      createItem(element);
    });
  }
}

//remove all items

function removeItems() {
  // delete from local storage
  localStorage.removeItem("fightList");
  let items = document.querySelectorAll(".fight-item");
  if (items.length > 0) {
    showAction(displayItemsAction, "All items deleted", false);
    items.forEach(function(element) {
      list.removeChild(element);
    });
  } else {
    showAction(displayItemsAction, "No more items to delete", true);
  }
}

// remove single item

function removeSingleItem(event) {
  event.preventDefault();
  let link = event.target.parentElement;
  if (link.classList.contains("fight-item__link")) {
    let text = link.previousElementSibling.innerHTML;
    let fightItem = event.target.parentElement.parentElement;
    //remove from the list
    list.removeChild(fightItem);
    showAction(displayItemsAction, `${text} removed from the list`, true);
    // remove from the local storage
    editStorage(text);
  }
}

// edit storage

function editStorage(item) {
  let fightItems = JSON.parse(localStorage.getItem("fightList"));
  let index = fightItems.indexOf(item);

  fightItems.splice(index, 1);

  localStorage.removeItem("fightList");
  localStorage.setItem("fightList", JSON.stringify(fightItems));
}
