// import react
import React, { Component } from "react";
import { getAll } from "../BooksAPI";
import BooksByShelf from "./BookShelf";

export default class BooksContainer extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      booksWithShelf: JSON.parse(localStorage.getItem("books")) || [],
    };
  }
  componentDidMount() {
    //async fetch data
    getAll().then((books) => {
      const booksWithShelf = books.map((book) => {
        return {
          ...book,
          shelf: "none",
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
    //loop through the books
    booksWithShelf.forEach((book) => {
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

  render() {
    return (
      <div>
        <div className="book-grid">
          <BooksByShelf
            books={this.state.booksWithShelf}
            shelf="None"
            title="All Books"
            handleDropdownChange={this.handleDropdownChange.bind(this)}
          />

          <BooksByShelf
            books={this.state.booksWithShelf}
            shelf="read"
            title="Read"
            handleDropdownChange={this.handleDropdownChange.bind(this)}
          />

          <BooksByShelf
            books={this.state.booksWithShelf}
            shelf="currentlyReading"
            title="Currently Reading"
            handleDropdownChange={this.handleDropdownChange.bind(this)}
          />

          <BooksByShelf
            books={this.state.booksWithShelf}
            shelf="wishlist"
            title="Want to read"
            handleDropdownChange={this.handleDropdownChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
