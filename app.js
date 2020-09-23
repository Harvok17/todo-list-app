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

modal.addEventListener("click", function (e) {
  if (e.target.classList[0] === "modal-container") {
    modalClose.click();
  }
});

modalClose.addEventListener("click", function () {
  modal.classList.remove("open");
  message.innerText = "";
  modalButtons.style.display = "none";
});

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
      } else {
        modalClose.click();
      }
    });
  }
});

submit.addEventListener("click", addTodoItem);
input.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    submit.click();
  }
});
list.addEventListener("click", deleteOrCheck);

function addTodoItem() {
  if (input.value) {
    container.style.opacity = "1";
    listItem = `<div class="todo">
            <li><span>${input.value}</span></li>
            <button class="todo-btn"><i class="far fa-trash-alt"></i></button>
        </div>`;

    list.insertAdjacentHTML("beforeend", listItem);
    input.value = "";
  } else {
    modal.classList.toggle("open");
    message.innerText = "Enter a to do item!";
  }
}

function deleteOrCheck(e) {
  if (e.target.className === "todo-btn") {
    e.target.parentNode.classList.add("slide");
    e.target.parentNode.addEventListener("transitionend", function () {
      e.target.parentNode.remove();
      if (list.firstChild === null) {
        container.style.opacity = "0";
      }
    });
  }

  if (e.target.classList[0] === "todo") {
    e.target.firstElementChild.classList.toggle("underline");
    e.target.classList.toggle("opaque");
  }
}
