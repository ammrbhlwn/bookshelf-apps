// import { saveData } from "./event,js";
import { bookList } from "./createList.js";
import { saveData } from "./saveDataLocal.js";

const RENDER_EVENT = "render-book";

// pindah buku ke selesai baca
function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// hapus buku
function removeBookFromCompleted(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  bookList.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// pindah buku ke belum selesai baca
function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// mencocokan id buku
function findBook(bookId) {
  for (const books of bookList) {
    if (books.id === bookId) {
      return books;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in bookList) {
    if (bookList[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

export { addBookToCompleted, removeBookFromCompleted, undoBookFromCompleted };
