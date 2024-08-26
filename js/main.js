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

// =================================

// =================================

// input data book
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

// =================================

// =================================

// =================================

// generate id
function generateId() {
  return +new Date();
}

// =================================

// =================================

// =================================

// generate object
function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

const bookList = [];
const RENDER_EVENT = "render-book";

document.addEventListener(RENDER_EVENT, function () {
  console.log(bookList);
});

// =================================

// =================================

// =================================

const search = (value) => {
  const filteredBooks = bookList.filter((item) =>
    item.title.toLowerCase().includes(value.toLowerCase())
  );

  const uncompletedBooks = filteredBooks.filter((item) => !item.isComplete);
  const completedBooks = filteredBooks.filter((item) => item.isComplete);

  renderSearchResults(uncompletedBooks, completedBooks);

  console.log("Filtered Books:", filteredBooks);
  console.log("Uncompleted Books:", uncompletedBooks);
  console.log("Completed Books:", completedBooks);
};

// =================================

// =================================

// =================================

// Fungsi untuk menangani pencarian saat tombol klik
const changeSearch = () => {
  event.preventDefault();
  const searchInput = document.getElementById("searchBookTitle");
  const searchValue = searchInput.value;
  search(searchValue);
};
document.getElementById("searchSubmit").addEventListener("click", changeSearch);

// =================================

// =================================

// =================================

const renderSearchResults = (uncompletedBooks, completedBooks) => {
  const uncompletedBookList = document.getElementById("incompleteBookList");
  const completedBookList = document.getElementById("completeBookList");

  uncompletedBookList.innerHTML = "";
  completedBookList.innerHTML = "";
  // Tampilkan buku yang sudah selesai dibaca
  completedBooks.forEach((book) => {
    const bookElement = createList(book);
    completedBookList.append(bookElement);
  });

  uncompletedBooks.forEach((book) => {
    const bookElement = createList(book);
    uncompletedBookList.append(bookElement);
  });
};

// =================================

// =================================

// =================================

// simpan buku
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
  // container.append(textContainer);

  return textContainer;
}

// =================================

// =================================

// =================================

// fungsi memindahkan buku ke selesai baca
function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// fungsi mencocokan id buku
function findBook(bookId) {
  for (const books of bookList) {
    if (books.id === bookId) {
      return books;
    }
  }
  return null;
}

// hapus buku
// fungsi hapus buku
function removeBookFromCompleted(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  bookList.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// fungsi membatalkan buku ke belum selesai baca
function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBookIndex(bookId) {
  for (const index in bookList) {
    if (bookList[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

// cari buku dari list
function searchBook(bookTitle) {
  for (const books of bookList) {
    if (books.title === bookTitle) {
      return books;
    }
  }
  return null;
}

// =================================

// =================================

// =================================

// selesai baca

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

// =================================

// =================================

// =================================

// save data local storage
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(bookList);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "Bookshelf_Apps";

function isStorageExist() /* boolean */ {
  if (typeof Storage === undefined) {
    alert("Gagal menyimpan data");
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      bookList.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}
