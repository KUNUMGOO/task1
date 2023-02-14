// ? достаем элементы из html
let btn = document.querySelector(".btn");
let inp = document.querySelector(".task-input");
let list = document.querySelector(".task-list");

// ? событие на кнопку при клике
btn.addEventListener("click", () => {
  // ? проверка на заполненность инпута
  if (!inp.value.trim()) {
    alert("запольните поле!!!");
    return;
  }
  // ? помещаем значение из инпута в объект под ключом таск
  let obj = { task: inp.value };
  //   ? вызов функции  добавление в localStorage
  setItemToStorage(obj);
  createElement();
  inp.value = ""; // очищаем инпут
});

function setItemToStorage(product) {
  // проверка на то , что есть ли в localStorage что нибудь под ключом task-data
  if (!localStorage.getItem("product-data")) {
    // если нет, то добаавляем по данным ключом пустой массив
    localStorage.setItem("product-data", "[]");
  }

  //   стягиваем из localStorage данные и проводим их к js формату
  let data = JSON.parse(localStorage.getItem("product-data"));

  data.push(product); // добавляем новый объект в массив

  //   обновленный массив преобразовываем в JSON формат и отправляем в localStorage
  localStorage.setItem("product-data", JSON.stringify(data));
}

createElement();
//  отображение данных
function createElement() {
  // стягиваем данные из localStorage и преобразовываем в js формат
  let newData = JSON.parse(localStorage.getItem("product-data"));
  list.innerHTML = ""; // очищаем содержимое списка, для того, чтобы не было дублирования
  if (newData !== null) {
    newData.forEach((item, index) => {
      // перебираем массив данных и для каждого элемента этого массив, создаем тег li с 2-мя кнопками
      let li = document.createElement("li");
      let btnDelete = document.createElement("button");
      let btnEdit = document.createElement("button");
      li.innerText = item.task;
      btnDelete.innerText = "Delete";
      btnEdit.innerText = "Edit";

      li.append(btnDelete);
      li.append(btnEdit);

      // добавили слушатели событий на кнопки delete и edit
      btnDelete.addEventListener("click", () => {
        deleteElement(index);
      });
      btnEdit.addEventListener("click", () => {
        editElement(index);
      });

      list.append(li); // добавляем в тег ul, новый созданный тег li
    });
  }
}

//! =============================================================================================

// функция для удаления таска
function deleteElement(index) {
  // получаем данные из хранилища (массив данных)
  let data = JSON.parse(localStorage.getItem("task-data"));

  data.splice(index, 1); // удаляем 1 элемеент по индексу
  localStorage.setItem("task-data", JSON.stringify(data)); //отправляем обновленный массив в хранилище
  createElement(); //отображаем измененный массив из хранилища
}

// ? edit
// получаем элементы модального окна
let mainModal = document.querySelector(".main-modal");
let inpEdit = document.querySelector(".inp-edit");
let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");

// функция редактирования
function editElement(index) {
  // отображаем модальное окно
  mainModal.style.display = "block";
  // получаем данные из хранилища
  let data = JSON.parse(localStorage.getItem("task-data"));

  // заполняем инпут
  inpEdit.value = data[index].task;

  // задаем аттрибут id, для последующего сохранения
  inpEdit.setAttribute("id", index);
}

// слущатель событий для закрытия модального окна Х
btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});

// слушатель событий для сохранения элемента, которая был отредактирован
btnSave.addEventListener("click", () => {
  // получаем данные из хранилища
  let data = JSON.parse(localStorage.getItem("product-data"));
  // получаем индекс редактируемого элемента
  let index = inpEdit.id;
  // проверка на заполненность
  if (!inpEdit.value.trim()) {
    alert("запольните поле!");
    return;
  }

  // формируем новый, уже отредактированный объект
  let editedTask = {
    task: inpEdit.value,
  };

  // заменяем старый объект на новый(который отредактировали)
  data.splice(index, 1, editedTask);
  // отправляем обновленный массив в хранилища
  localStorage.setItem("task-data", JSON.stringify(data));
  // закрываем модальное окно
  mainModal.style.display = "none";
  // отображаем обновленные данные
  createElement();
});
