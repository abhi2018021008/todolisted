"use strict";

// getting all required elements
var inputBox = document.querySelector(".inputField input");
var addBtn = document.querySelector(".inputField button");
var todoList = document.querySelector(".todoList");
var deleteAllBtn = document.querySelector(".footer button"); // onkeyup event

inputBox.onkeyup = function () {
  var userEnteredValue = inputBox.value; //getting user entered value

  if (userEnteredValue.trim() != 0) {
    //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  } else {
    addBtn.classList.remove("active"); //unactive the add button
  }
};

showTasks(); //calling showTask function

addBtn.onclick = function () {
  //when user click on plus icon button
  var userEnteredValue = inputBox.value; //getting input field value

  var getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage

  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray = []; //create a blank array
  } else {
    listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
  }

  listArray.push(userEnteredValue); //pushing or adding new value in array

  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string

  showTasks(); //calling showTask function

  addBtn.classList.remove("active"); //unactive the add button once the task added
};

function showTasks() {
  var getLocalStorageData = localStorage.getItem("New Todo");

  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }

  var pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask

  if (listArray.length > 0) {
    //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  } else {
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }

  var newLiTag = "";
  listArray.forEach(function (element, index) {
    newLiTag += "<li>".concat(element, "<span class=\"icon\" onclick=\"deleteTask(").concat(index, ")\"><i class=\"fas fa-trash\"></i></span></li>");
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag

  inputBox.value = ""; //once task added leave the input field blank
} // delete task function


function deleteTask(index) {
  var getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li

  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
} // delete all tasks function


deleteAllBtn.onclick = function () {
  listArray = []; //empty the array

  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage

  showTasks(); //call the showTasks function
};
//# sourceMappingURL=script.dev.js.map
