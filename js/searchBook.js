import { bookList, createList } from "./createList.js";

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

// Fungsi untuk menangani pencarian saat tombol klik
const changeSearch = () => {
  event.preventDefault();
  const searchInput = document.getElementById("searchBookTitle");
  const searchValue = searchInput.value;
  search(searchValue);
};

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

export { search, changeSearch };
