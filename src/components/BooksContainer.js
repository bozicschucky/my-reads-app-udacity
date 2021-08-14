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

  render() {
    console.log("the state -->, this.state.books", this.state.books);
    return (
      <div>
        <h1>Books</h1>
        {/* map through the books */}
        {this.state.books.map((book) => {
          return (
            <Book
              key={book.id}
              title={book.title}
              author={book.authors[0]}
              image={book.imageLinks.thumbnail}
            />
          );
        })}
        <Book />
      </div>
    );
  }
}
