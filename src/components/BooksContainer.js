// import react
import React, { Component } from "react";
import { getAll } from "../BooksAPI";
import BooksByShelf from "./BookShelf";
import Search from "./Search";

export default class BooksContainer extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      booksWithShelf: JSON.parse(localStorage.getItem("books")) || [],
      searchResults: [],
      search: false,
    };
  }
  componentDidMount() {
    //async fetch data
    getAll().then((books) => {
      const booksWithShelf = books.map((book) => {
        return {
          ...book,
          shelf: "None",
        };
      });
      if (localStorage.getItem("books") === null) {
        localStorage.setItem("books", JSON.stringify(booksWithShelf));
        this.setState({ booksWithShelf: books });
      } else {
        const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
        this.setState({ booksWithShelf: savedBooks });
      }
    });
  }

  //create a function that gets the selected dropdown value
  handleDropdownChange(e) {
    const valueToFilter = e.target.value.split(",");
    const bookShelf = valueToFilter[0];
    const bookTitle = valueToFilter[1];
    const { booksWithShelf } = this.state;

    const booksCopy = [...booksWithShelf];
    booksCopy.forEach((book) => {
      //if the book is selected
      if (book.title === bookTitle) {
        book.shelf = bookShelf;
      }
    });
    // //set the new array as the books state
    localStorage.setItem("books", JSON.stringify(booksCopy));
    this.setState({
      booksWithShelf: booksCopy,
    });
  }
  onSearch(e) {
    const searchTerm = e.target.value;
    if (!searchTerm) {
      this.setState({
        search: false,
      });
    }
    if (searchTerm) {
      const books = JSON.parse(localStorage.getItem("books"));
      const foundBooks = [];
      books.forEach((book) => {
        //if the book is selected
        const searchByTitle =
          book.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        const authors = book.authors.join(",").toLowerCase();
        const searchByAuthors = authors.indexOf(searchTerm.toLowerCase()) > -1;

        if (searchByTitle || searchByAuthors) {
          foundBooks.push(book);
        }
      });

      this.setState({
        searchResults: foundBooks,
        search: true,
      });
    }
  }

  render() {
    const booksData = this.state.search
      ? this.state.searchResults
      : this.state.booksWithShelf;
    return (
      <div>
        <Search onSearch={this.onSearch.bind(this)} />
        <div className="book-grid">
          <BooksByShelf
            books={booksData}
            shelf="None"
            title="All Books"
            handleDropdownChange={this.handleDropdownChange.bind(this)}
          />

          <BooksByShelf
            books={booksData}
            shelf="read"
            title="Read"
            handleDropdownChange={this.handleDropdownChange.bind(this)}
          />

          <BooksByShelf
            books={booksData}
            shelf="currentlyReading"
            title="Currently Reading"
            handleDropdownChange={this.handleDropdownChange.bind(this)}
          />

          <BooksByShelf
            books={booksData}
            shelf="wishlist"
            title="Want to read"
            handleDropdownChange={this.handleDropdownChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
