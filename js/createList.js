import {
  addBookToCompleted,
  removeBookFromCompleted,
  undoBookFromCompleted,
} from "./actionButton.js";

const bookList = [];

function createList(addObject) {
  const textTitle = document.createElement("h3");
  textTitle.innerText = addObject.title;
  textTitle.setAttribute("data-testid", "bookItemTitle");

  const textAuthor = document.createElement("p");
  textAuthor.innerText = "Penulis: " + addObject.author;
  textAuthor.setAttribute("data-testid", "bookItemAuthor");

  const textYear = document.createElement("p");
  textYear.innerText = "Tahun: " + addObject.year;
  textYear.setAttribute("data-testid", "bookItemYear");

  // membuat susunan layout
  const textContainer = document.createElement("div");
  textContainer.setAttribute("data-bookid", addObject.id);
  textContainer.setAttribute("data-testid", "bookItem");
  textContainer.classList.add("inner");

  //membuat card list
  textContainer.append(textTitle, textAuthor, textYear);

  // tombol hapus buku (delete)
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Hapus buku";
  deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
  deleteButton.classList.add("delete-button");

  deleteButton.addEventListener("click", function () {
    removeBookFromCompleted(addObject.id);
  });

  // append tombol dalam container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  // setelah pencet tombol form setelah selesai baca
  if (addObject.isComplete) {
    // tombol saat submit tp belum selesai baca (undo)
    const uncompletedButton = document.createElement("button");
    uncompletedButton.innerText = "Belum selesai dibaca";

    uncompletedButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    uncompletedButton.classList.add("uncompleted-button");

    uncompletedButton.addEventListener("click", function () {
      undoBookFromCompleted(addObject.id);
    });

    buttonContainer.append(uncompletedButton, deleteButton);
  }

  // setelah add buku yang belum selesai baca
  else {
    const completedButton = document.createElement("button");
    completedButton.innerText = "Selesai dibaca";
    completedButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    completedButton.classList.add("completed-button");

    completedButton.addEventListener("click", function () {
      addBookToCompleted(addObject.id);
    });

    buttonContainer.append(completedButton, deleteButton);
  }

  textContainer.append(buttonContainer);

  return textContainer;
}

export { bookList, createList };
