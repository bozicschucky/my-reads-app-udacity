// import react
import React, { Component } from "react";
import { getAll, update } from "../BooksAPI";
import BooksShelfContainer from "./BookShelfContainer";

export default class BooksContainer extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      booksWithShelf: [],
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

      this.setState({ booksWithShelf: booksWithShelf });
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
        if (bookShelf === "None") {
          //prevents showing of books with the None shelf
          book.shelf = "non";
          update(book, "non");
        } else {
          update(book, bookShelf);
        }
      }
    });
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
