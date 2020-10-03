//Form
let submit = document.getElementById("submit");
let clear = document.getElementById("clear");
let input = document.getElementById("inputfield");
let list = document.getElementById("list");
let todos = list.children;
let container = document.getElementById("list-container");
let modal = document.querySelector(".modal-container");
let message = document.querySelector(".message");
let modalClose = document.querySelector(".close");
let modalButtons = document.querySelector(".modal-buttons");
let okay = document.getElementById("ok");
let cancel = document.getElementById("cancel");



//LOCAL STORAGE
let LIST; //LIST array to manage todo data
let data = localStorage.getItem("TODO");

if(data){
  container.style.opacity = "1";
  LIST = JSON.parse(data);
  LIST.forEach(function(item){
    addTodoItem(item.input,item.task);
  });
} else{
  LIST = [];
}
//////////////////////////////

//close modal when clicking the background
modal.addEventListener("click", function (e) {
  if (e.target == modal) {
    modalClose.click();
  }
});

//close button of modal
modalClose.addEventListener("click", function () {
  modal.classList.remove("open");
  message.innerText = "";
  modalButtons.style.display = "none";
});

//clearing the list
clear.addEventListener("click", function () {
  if (list.innerHTML === "") {
    modal.classList.add("open");
    message.innerText = "There's no list to clear!";
  } else {
    modal.classList.add("open");
    message.innerText = "Are you sure you wanna clear list?";
    modalButtons.style.display = "flex";

    modalButtons.addEventListener("click", function (e) {
      if (e.target.id === "ok") {
        for (let i = 0; i < todos.length; i++) {
          todos[i].classList.add("slide");
        }
        todos[todos.length - 1].addEventListener("transitionend", function () {
          list.innerHTML = "";
          container.style.opacity = "0";
        });
        modalClose.click();
        localStorage.clear(); //clearing the local storage as well
      } else {
        modalClose.click();
      }
    });
  }
});

//adding a todo item
submit.addEventListener("click", () =>{
  if (input.value) {
    container.style.opacity = "1";
    // add todo item function
    addTodoItem(input.value,false);
    //pushing object literal to LIST array to organize todo data
    LIST.push(
      {
        input:input.value,
        task: false
      });
      //saving and updating data to local storage
    localStorage.setItem("TODO",JSON.stringify(LIST));
    input.value = "";
  } else {
    modal.classList.toggle("open");
    message.innerText = "Enter a to do item!";
  }
});
//add todo item using Enter key
input.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    submit.click();
  }
});

//deleting item or marking item as done
list.addEventListener("click", deleteOrCheck);


//FUNCTIONS|HANDLERS
function addTodoItem(input,task) {
   const DONE = task ? "opaque" : "";
   const LINE = task ? "underline" : "";
  
   listItem = 
   `<div class="todo ${DONE}">
      <li class="${LINE}"><span>${input}</span></li>
      <button class="del-btn"><i class="far fa-trash-alt"></i></button>
     </div>`;
  
    list.insertAdjacentHTML("beforeend", listItem);
}

function deleteOrCheck(e) {
  let finder = Array.from(todos); //to iterate the current list of todo items
  
  if (e.target.className === "del-btn") {
    e.target.parentNode.classList.add("slide");
    e.target.parentNode.addEventListener("transitionend", function () {
      e.target.parentNode.remove();
      //If list is empty, hide container and clear local storage
      if (list.firstChild === null) {
        container.style.opacity = "0";
        localStorage.clear();
      }
    });
    let trash = finder.indexOf(e.target.parentNode); //to find the index of item
    LIST.splice(trash,1); // delete item from array
  }

  if (e.target.classList[0] === "todo") {
    e.target.firstElementChild.classList.toggle("underline");
    e.target.classList.toggle("opaque");
    let done = finder.indexOf(e.target); //to find the index of item
    LIST[done].task = LIST[done].task ? false: true;
  }
  
  //update local storage after updating LIST
  localStorage.setItem("TODO",JSON.stringify(LIST));
}
