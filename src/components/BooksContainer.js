// import react
import React, { Component } from "react";
import { getAll } from "../BooksAPI";
import BooksShelfContainer from "./BookShelfContainer";

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
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  //create a function that gets the selected dropdown value
  handleDropdownChange(e) {
    const valueToFilter = e.target.value.split(",");
    const bookShelf = valueToFilter[0];
    const bookId = valueToFilter[2];
    const { booksWithShelf } = this.state;

    const booksCopy = [...booksWithShelf];
    booksCopy.forEach((book) => {
      //if the book is selected
      if (book.id === bookId) {
        book.shelf = bookShelf;
      }
    });
    //set the new array as the books state
    localStorage.setItem("books", JSON.stringify(booksCopy));
    this.setState({
      booksWithShelf: booksCopy,
    });
  }

  render() {
    const booksData = this.state.booksWithShelf;
    return (
      <div>
        <div id="page-text"></div>
        <div>
          <BooksShelfContainer
            booksData={booksData}
            handleDropdownChange={this.handleDropdownChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}
