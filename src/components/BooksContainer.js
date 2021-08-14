// import react
import React, { Component } from "react";
//import from BooksAPI.js
import { getAll } from "../BooksAPI";
import Book from "./Book";

// create a class component
export default class BooksContainer extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      currentlyReading: [],
      read: [],
      wishlist: [],
    };
  }
  // componentDidMount
  componentDidMount() {
    //async await fetch data
    getAll().then((books) => {
      this.setState({ books });
    });
  }

  //create a function that gets the selected dropdown value
  handleDropdownChange(e) {
    //create a function that gets the selected dropdown value
    const valueToFilter = e.target.value.split(",");
    const bookStore = valueToFilter[0];
    const bookTitle = valueToFilter[1];
    const bookCategory = this.state[bookStore];
    const { books } = this.state;
    console.log(
      "🚀 ~ file: booksContainer.js ~ line 38 ~ BooksContainer ~ handleDropdownChange ~ bookCategory",
      bookCategory
    );
    // //create a new array
    let newBooks = [];
    //loop through the books
    books.forEach((book) => {
      //if the book is selected
      if (book.title === bookTitle) {
        //add the book to the new array
        newBooks.push(book);
      }
    });
    const booksWithNoDuplicates = [...new Set(newBooks)];
    // //set the new array as the books state
    this.setState({ [bookStore]: [...bookCategory, ...newBooks] });
  }

  render() {
    console.log("the state -->, this.state", this.state);
    return (
      <div>
        <h1>Books</h1>
        {/* map through the books */}
        {this.state.books.map((book) => {
          return (
            <Book
              key={book.id}
              title={book.title}
              author={book.authors.join()}
              image={book.imageLinks.thumbnail}
              handleDropdownChange={this.handleDropdownChange.bind(this)}
            />
          );
        })}
        <Book />
      </div>
    );
  }
}
