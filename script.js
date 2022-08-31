"use strict";

/**
 * Variables
 */

// Journal with all eaten food by day
let eatenFoodList = {
  //  model
  // "30.08.2022": [
  //   { itemName: "avocado", kcal: 70, qty: 1 },
  //   {
  //     itemName: "fish",
  //     kcal: 50,
  //     qty: 1,
  //   },
  // ],
};

// Database with all known food
const foodDatabase = [
  { itemName: "avocado", calNo: 70 },
  {
    itemName: "fish",
    calNo: 50,
  },
  {
    itemName: "carrot",
    calNo: 30,
  },
  {
    itemName: "banana",
    calNo: 100,
  },
  {
    itemName: "rice",
    calNo: 80,
  },
  {
    itemName: "milk",
    calNo: 60,
  },
];

// Parse date from timestamp to dd.mm.yyyy format
const formatDate = (date) => {
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

let today = formatDate(new Date());
let myeatenFoodList = [];
let myHistoryList = [];

const displayListContainer = document.getElementById("resultId");
const displayTotal = document.querySelector(".search");

let foodList = document.getElementById("myList");

const divTotalKcal = document.createElement("div");
divTotalKcal.classList.add("div-totalKcal");

function displayEatenFood({ itemName, kcal, qty }) {
  let divResult = document.createElement("div");
  const divNameTable = document.getElementsByClassName(".name");

  let divName = document.createElement("div");
  divName.innerHTML = itemName;
  divName.classList.add("div-item-name");

  let divKcal = document.createElement("div");
  divKcal.innerHTML = kcal;
  divKcal.classList.add("div-item");

  let divQty = document.createElement("div");
  divQty.innerHTML = qty;
  divQty.classList.add("div-item");

  displayListContainer.appendChild(divResult);
  divResult.classList.add("result-Item");
  divResult.appendChild(divName);
  divResult.appendChild(divKcal);
  divResult.appendChild(divQty);
}

function displayListForToday() {
  let totalKcal = 0;
  displayListContainer.innerHTML = "";

  if (eatenFoodList[today] != undefined)
    eatenFoodList[today].map((item) => {
      displayEatenFood(item);
      totalKcal += item.kcal * item.qty;
      divTotalKcal.innerHTML = `Your total Kcal  is: ${totalKcal}`;
    });
  displayTotal.appendChild(divTotalKcal);
}

document.getElementById("searchBar").addEventListener("submit", (event) => {
  event.preventDefault();

  let inputValue,
    newItem = {};
  const btnAdd = document.querySelector(".btn--addItem");
  inputValue = document.getElementsByName("searchTxt")[0].value;

  let sw = false;

  for (let i = 0; i < foodDatabase.length; i++) {
    let sw2 = false;

    if (inputValue.toLowerCase() === foodDatabase[i].itemName.toLowerCase()) {
      // daca astazi este definita
      if (eatenFoodList[today] != undefined) {
        // parcurg fiecare aliment mancat astazi
        for (let j = 0; j < eatenFoodList[today].length; j++) {
          if (
            eatenFoodList[today][j].itemName.toLowerCase() ===
            inputValue.toLowerCase()
          ) {
            eatenFoodList[today][j].qty++;
            displayListForToday();
            sw2 = true;
            break;
          }
        }
        // daca nu se
        if (!sw2) {
          // trebuie sa il adaug in today
          eatenFoodList[today].push({
            itemName: foodDatabase[i].itemName,
            kcal: foodDatabase[i].calNo,
            qty: 1,
          });
        }
      } else {
        eatenFoodList[today] = [];
        eatenFoodList[today].push({
          itemName: foodDatabase[i].itemName,
          kcal: foodDatabase[i].calNo,
          qty: 1,
        });

        displayListForToday();
      }

      sw = true;
      break;
    }
  }

  if (!sw) {
    const x = document.getElementById("additem");
    document.getElementById("addMyItem").value =
      document.getElementById("myInput").value;
    x.style.display = "flex";

    btnAdd.addEventListener("click", function (event) {
      event.preventDefault();
      newItem.itemName = document.getElementsByName("addTxt")[0].value;
      newItem.kcal = Number(document.getElementsByName("addTxtNoCal")[0].value);
      newItem.qty = Number(document.getElementsByName("addTxtQty")[0].value);
      eatenFoodList[today].push(newItem);
      displayListForToday();
    });
  }
});
