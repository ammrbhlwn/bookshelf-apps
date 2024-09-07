import { bookList, createList } from "./createList.js";
import { saveData } from "./saveDataLocal.js";

function addBook() {
  const textBookTitle = document.getElementById("bookFormTitle").value;
  const textBookAuthor = document.getElementById("bookFormAuthor").value;
  const textBookYear = parseInt(document.getElementById("bookFormYear").value);
  const checkedBox = document.getElementById("bookFormIsComplete").checked;

  const generatedID = generateId();
  const addObject = generateBookObject(
    generatedID,
    textBookTitle,
    textBookAuthor,
    textBookYear,
    checkedBox
  );

  bookList.push(addObject);

  if (checkedBox) {
    document.getElementById("completeBookList").append(createList(addObject));
  } else {
    document.getElementById("incompleteBookList").append(createList(addObject));
  }
  saveData();

  const form = document.querySelector(".bookForm");
  if (form) {
    form.reset();
  }
}

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

export default addBook;
