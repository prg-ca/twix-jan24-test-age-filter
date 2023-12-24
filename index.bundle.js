/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
const YEAR_INI = 1950;
// const YEAR_INI = 1940
const YEAR_LAST = 2015;
const YEAR_THRESHOLD = 2008;
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
for (let i = YEAR_LAST; i > YEAR_INI; i--) {
  const select = document.getElementById("age-select-year");
  const element = document.createElement("option");
  element.innerHTML = `${i}`;
  element.value = i;
  select.appendChild(element);
}
buildCustomSelect('year', handleYear);
function buildCustomSelect(name, fn, month = null) {
  var x, j, ll, selElmnt, a, b, c;
  if (month) {
    generateDays(month);
  }
  x = document.getElementById(`age-select-${name}-wrapper`);
  x.classList.add('age__select--visible');
  selElmnt = document.getElementById(`age-select-${name}`);
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.classList.add('select-selected--empty');
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x.appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
      and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x.appendChild(b);
  a.addEventListener("click", e => fn(e, a));
}
function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
function handleYear(e, el) {
  /* When the select box is clicked, close any other select boxes,
  and open/close the current select box: */
  e.stopPropagation();
  // console.log(el)
  closeAllSelect(el);
  el.classList.remove("select-selected--empty");
  el.nextSibling.classList.toggle("select-hide");
  el.classList.toggle("select-arrow-active");
  if (Number(el.innerText) > YEAR_THRESHOLD) {
    console.log("going to restricted page");
    goToPage('restricted');
  } else if (Number(el.innerText) === YEAR_THRESHOLD) {
    console.log("showing month");
    if (!document.getElementById('age-select-month-wrapper').classList.contains('age__select--visible')) {
      buildCustomSelect('month', handleMonth);
    }
  } else if (Number(el.innerText) < YEAR_THRESHOLD) {
    console.log("going further");
    goToPage('main-page');
  } else {
    console.log("do nothing");
  }
}
function handleMonth(e, el) {
  e.stopPropagation();
  closeAllSelect(el);
  el.classList.remove("select-selected--empty");
  el.nextSibling.classList.toggle("select-hide");
  el.classList.toggle("select-arrow-active");
  const selectedMonth = months.indexOf(el.innerText);
  // console.log("selected: ", selectedMonth)
  const date = new Date(Date.now());
  const currentMonth = date.getMonth();
  // console.log("current: ", currentMonth)

  if (selectedMonth < 0) {
    console.log("do nothing");
  } else if (selectedMonth < currentMonth) {
    console.log("going further");
    goToPage('main-page');
  } else if (selectedMonth === currentMonth) {
    console.log("showing day");
    buildCustomSelect('day', handleDay, selectedMonth);
  } else if (selectedMonth > currentMonth) {
    console.log("going to restricted page");
    goToPage('restricted');
  }
}
function handleDay(e, el) {
  e.stopPropagation();
  closeAllSelect(el);
  el.classList.remove("select-selected--empty");
  el.nextSibling.classList.toggle("select-hide");
  el.classList.toggle("select-arrow-active");
  const date = new Date(Date.now());
  const currentDay = date.getDate();
  if (Number(el.innerText) > currentDay) {
    console.log("going to restricted page");
    goToPage('restricted');
  } else if (Number(el.innerText) <= currentDay) {
    console.log("going further");
    goToPage('main-page');
  } else {
    console.log("do nothing");
  }
}
function generateDays(month) {
  let numberOfDays = 0;
  console.log('generating');
  const date = new Date(Date.now());
  // const currentDay = date.getDay() 
  // const currentMonth = date.getMonth()
  if (month === 0 || month === 2 || month === 4 || month === 7 || month === 9 || month === 11) {
    numberOfDays = 31;
  } else if (month === 1) {
    const currentYear = date.getYear();
    const isLeapYear = currentYear % 4 === 0 && currentYear % 100 !== 0 || currentYear % 400 === 0;
    numberOfDays = isLeapYear ? 29 : 28;
  } else {
    numberOfDays = 30;
  }
  const selectWrapper = document.getElementById('age-select-day-wrapper');
  selectWrapper.innerHTML = "";
  const select = document.createElement('select');
  select.id = "age-select-day";
  select.innerHTML = '<option value="" data-header="empty">Выбери дату:</option>';
  for (let i = 1; i <= numberOfDays; i++) {
    const element = document.createElement("option");
    element.innerHTML = `${i}`;
    element.value = i;
    select.appendChild(element);
  }
  selectWrapper.appendChild(select);
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
function goToPage(url) {
  const restrictedModal = document.getElementById("restricted");
  const restrictedBtn = document.getElementById("restricted-btn");
  const okModal = document.getElementById("ok");
  const okBtn = document.getElementById("ok-btn");
  if (url === 'restricted') {
    restrictedModal.classList.add('modal--visible');
  } else {
    okModal.classList.add('modal--visible');
  }
  restrictedBtn.addEventListener("click", () => {
    restrictedModal.classList.remove('modal--visible');
    resetSelect();
  });
  okBtn.addEventListener("click", () => {
    okModal.classList.remove('modal--visible');
    resetSelect();
  });

  // window.location.assign(`${url}.html`);
}

function resetSelect() {
  window.location.reload();
}
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// extracted by mini-css-extract-plugin

})();

/******/ })()
;