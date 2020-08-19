const currentTitle = document.querySelector("#current-year-month");
const calendarBody = document.querySelector("#calendar-body");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const today = new Date();
let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
const MONTH_LIST = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const NO_LEAP_YEAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let pageFirstDay = firstDay;
let pageYear;

function checkLeafYear() {
  if (today.getFullYear % 4 === 0) pageYear = LEAP_YEAR;
  else pageYear = NO_LEAP_YEAR;
}

function showYearMonth(pageFirstDay) {
  currentTitle.innerText = `${
    MONTH_LIST[pageFirstDay.getMonth()]
  }, ${pageFirstDay.getFullYear()}`;
}

function showCalendar() {
  checkLeafYear();
  let monthCnt = 100;
  let cnt = 1;
  //주생성 (최대 6주)
  for (let i = 0; i < 6; i++) {
    let tr = document.createElement("tr");
    tr.id = monthCnt;
    //일 설정
    for (let j = 0; j < 7; j++) {
      if (
        //요일을 반환하는 getDay를 이용해 첫주 설정
        //cnt를 이용해 각월의 일수를 초과 마지막주 설정
        (i === 0 && j < firstDay.getDay()) ||
        cnt > pageYear[firstDay.getMonth()]
      ) {
        let td = document.createElement("td");
        tr.appendChild(td);
      } else {
        let td = document.createElement("td");
        td.textContent = cnt;
        td.id = cnt;
        tr.appendChild(td);
        cnt++;
      }
    }
    monthCnt++;
    calendarBody.appendChild(tr);
  }
}

//prev next 할때 remove
function removeCalendar() {
  let getTr = 100;
  for (let i = 100; i < 106; i++) {
    let tr = document.getElementById(getTr);
    tr.remove();
    getTr++;
  }
}
//prev btn
function prev() {
  if (pageFirstDay.getMonth() === 0) {
    pageFirstDay = new Date(firstDay.getFullYear() - 1, 11, 1);
    firstDay = pageFirstDay;
    checkLeafYear();
  } else {
    pageFirstDay = new Date(firstDay.getFullYear(), firstDay.getMonth() - 1, 1);
    firstDay = pageFirstDay;
  }
  showYearMonth(pageFirstDay);
  removeCalendar();
  showCalendar();
}
function next() {
  if (pageFirstDay.getMonth() === 11) {
    pageFirstDay = new Date(firstDay.getFullYear() + 1, 0, 1);
    firstDay = pageFirstDay;
    checkLeafYear();
  } else {
    pageFirstDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 1);
    firstDay = pageFirstDay;
  }
  showYearMonth(pageFirstDay);
  removeCalendar();
  showCalendar();
}

function init() {
  showCalendar();
  showYearMonth(pageFirstDay);
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);
}
init();
