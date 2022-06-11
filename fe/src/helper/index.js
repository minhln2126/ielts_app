import * as XLSX from "xlsx";
function showScore(s) {
  document.getElementById("modal").classList.add("show_flex");
  document.getElementById("scorePopup").classList.add("show_flex");
  document.getElementById("scoreDisplay").innerHTML = s;
}
function showStatus(status, message) {
  let modal = document.getElementById("modal");
  let msgDisplay = document.getElementById("statusMsg");
  let statusPopup = document.getElementById("statusPopup");
  modal.classList.add("show_flex");
  statusPopup.classList.add("show_flex");
  msgDisplay.innerHTML = message;
  if (status === "loading") {
    msgDisplay.innerHTML =
      '<img src="https://i.ibb.co/Z64YB8h/ajax-loader.gif" alt="">';
    return;
  }
  if (status === "success") {
    document.getElementById("closeStatusBtn").onclick = () => {
      document.location.reload();
    };
    return;
  }
  document.getElementById("closeStatusBtn").onclick = () => {
    statusPopup.classList.remove("show");
    modal.classList.remove("show_flex");
  };
}
function showSidebar() {
  document.getElementById("modal").classList.add("show");
  document.getElementById("menuSidebar").style.width = "300px";
  document
    .getElementById("menuSidebar")
    .addEventListener("transitionend", () => {
      document.body.style.overflow = "hidden";
    });
}
function closeSidebar() {
  const sidebar = document.getElementById("menuSidebar");
  sidebar.style.width = "0";
  sidebar.addEventListener("transitionend", () => {
    if (!sidebar.offsetWidth) {
      document.body.style.overflow = "auto";
      document.getElementById("modal").classList.remove("show");
    }
  });
}
function toggleSubitem() {
  const subitem = document.getElementById("sidebarSubitem");
  if (subitem.offsetHeight === 0) subitem.style.height = "9em";
  else subitem.style.height = "0";
}
function randomHexColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
}
function formatDate(date) {
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;
  var hour = date.getHours().toString();
  hour = hour.length > 1 ? hour : "0" + hour;
  var minute = date.getMinutes().toString();
  minute = minute.length > 1 ? minute : "0" + minute;
  var second = date.getSeconds().toString();
  second = second.length > 1 ? second : "0" + second;
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}
function getCurrentDate() {
  return formatDate(new Date()).split(" ")[0];
}
async function xlsxToJson(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    var result = [];
    reader.onload = function (event) {
      var data = event.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach(function (sheetName) {
        console.log(workbook.Sheets[sheetName]);
        var XL_row_object = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );
        if (XL_row_object.length > 0) {
          result = XL_row_object;
          resolve(result);
        }
      });
    };
    reader.onerror = function (event) {
      console.error("File could not be read! Code " + event.target.error.code);
      resolve([]);
    };
    reader.readAsBinaryString(file);
  });
}
export {
  showScore,
  showSidebar,
  closeSidebar,
  toggleSubitem,
  showStatus,
  randomHexColor,
  formatDate,
  getCurrentDate,
  xlsxToJson,
};
