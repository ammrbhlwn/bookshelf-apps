// input book
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  updateInfo([], []);

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

// =================================

// =================================

// =================================

// popup-form
const openForm = document.querySelector(".openForm");
const popup = document.getElementById("book-form");
const addBooks = document.querySelector(".button-submit");

popup.classList.add("hidden");

openForm.addEventListener("click", function () {
  if (popup.classList.contains("hidden")) {
    popup.classList.remove("hidden");
  } else {
    popup.classList.add("hidden");
  }
});

addBooks.addEventListener("click", function () {
  popup.classList.add("hidden");
});

// =================================

// =================================

// =================================

// input data book
function addBook() {
  const textBookTitle = document.getElementById("addTitle").value;
  const textBookAuthor = document.getElementById("addAuthor").value;
  const textBookYear = document.getElementById("addYear").value;
  const checkedBox = document.getElementById("checked").checked;

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
    document.getElementById("completed").append(createList(addObject));
  } else {
    document.getElementById("uncompleted").append(createList(addObject));
  }
  saveData();

  const form = document.querySelector(".form");
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
function generateBookObject(id, title, author, year, check) {
  return {
    id,
    title,
    author,
    year,
    check,
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

const updateInfo = (filteredBooks, searchValue) => {
  const infoElement = document.getElementById("info");

  const displayValue = searchValue ? filteredBooks.length : 0;

  // Memperbarui teks elemen dengan hasil pencarian
  infoElement.innerText =
    "Ditemukan " +
    displayValue +
    " buku dengan pencarian " +
    "'" +
    searchValue +
    "'";
};

// =================================

// =================================

// =================================

const search = (value) => {
  const filteredBooks = bookList.filter(
    (item) =>
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.author.toLowerCase().includes(value.toLowerCase()) ||
      item.year.includes(value)
  );

  const uncompletedBooks = filteredBooks.filter((item) => !item.check);
  const completedBooks = filteredBooks.filter((item) => item.check);

  updateInfo(filteredBooks, value);
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
  const searchInput = document.getElementById("searchTitle");
  const searchValue = searchInput.value;
  search(searchValue);
};
document.getElementById("searchTitle").addEventListener("input", changeSearch);

// =================================

// =================================

// =================================

const renderSearchResults = (uncompletedBooks, completedBooks) => {
  const uncompletedBookList = document.getElementById("uncompleted");
  const completedBookList = document.getElementById("completed");

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
  const textTitle = document.createElement("h2");
  textTitle.innerText = addObject.title;
  textTitle.setAttribute("data-testid", "bookItemTitle");

  const textAuthor = document.createElement("p");
  textAuthor.innerText = "Penulis : " + addObject.author;
  textTitle.setAttribute("data-testid", "bookItemAuthor");

  const textYear = document.createElement("p");
  textYear.innerText = "Tahun terbit : " + addObject.year;
  textTitle.setAttribute("data-testid", "bookItemYear");

  // membuat susunan layout
  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.setAttribute("data-testid", "bookItem");

  //membuat card list
  textContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", addObject.id);

  // tombol hapus buku (delete)
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.setAttribute("data-testid", "bookItemDeleteButton");

  deleteButton.addEventListener("click", function () {
    removeBookFromCompleted(addObject.id);
  });

  // setelah pencet tombol form setelah selesai baca
  if (addObject.check) {
    // tombol saat submit tp belum selesai baca (undo)
    const uncompletedButton = document.createElement("button");
    uncompletedButton.classList.add("uncompleted-button");
    uncompletedButton.setAttribute("data-testid", "bookItemIsCompleteButton");

    uncompletedButton.addEventListener("click", function () {
      undoBookFromCompleted(addObject.id);
    });

    container.append(uncompletedButton, deleteButton);
  }

  // setelah add buku yang belum selesai baca
  else {
    const completedButton = document.createElement("button");
    completedButton.classList.add("completed-button");
    completedButton.setAttribute("data-testid", "bookItemIsCompleteButton");

    completedButton.addEventListener("click", function () {
      addBookToCompleted(addObject.id);
    });

    container.append(completedButton, deleteButton);
  }

  return container;
}

// =================================

// =================================

// =================================

// fungsi memindahkan buku ke selesai baca
function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.check = true;
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

  bookTarget.check = false;
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
  const uncompletedBookList = document.getElementById("uncompleted");
  uncompletedBookList.innerHTML = "";

  const completedBookList = document.getElementById("completed");
  completedBookList.innerHTML = "";

  for (const books of bookList) {
    const bookElement = createList(books);
    if (!books.check) uncompletedBookList.append(bookElement);
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
