import { createList, bookList } from "./createList.js";
import addBook from "./addBook.js";

import {
  RENDER_EVENT,
  loadDataFromStorage,
  isStorageExist,
} from "./saveDataLocal.js";

import { changeSearch } from "./searchBook.js";

// input book
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("bookForm");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

// =================================

document.addEventListener(RENDER_EVENT, function () {
  console.log(bookList);
});

// =================================

document.getElementById("searchSubmit").addEventListener("click", changeSearch);

// =================================

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBookList = document.getElementById("incompleteBookList");
  uncompletedBookList.innerHTML = "";

  const completedBookList = document.getElementById("completeBookList");
  completedBookList.innerHTML = "";

  for (const books of bookList) {
    const bookElement = createList(books);
    if (!books.isComplete) uncompletedBookList.append(bookElement);
    else completedBookList.append(bookElement);
  }
});
