// create a search component react
import React, { Component } from "react";
import { search, update, getAll } from "../BooksAPI";
import BooksShelfContainer from "./BookShelfContainer";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksWithShelf: {},
      searchResultsMap: [],
      selectedSearchResults: {},
    };
  }

  componentDidMount() {
    //async fetch data
    const booksMap = {};
    getAll().then((books) => {
      books.forEach((book) => {
        booksMap[book.id] = book;
      });
      this.setState({ booksWithShelf: booksMap });
    });
  }
  handleChange(e) {
    search(e.target.value).then((data) => {
      const dataFromServer = !data || data["error"] ? [] : data;
      this.setState({
        searchResultsMap: dataFromServer.map((book) => {
          // if a book has a shelf we don't add a default one
          if (this.state.booksWithShelf[book.id]) {
            return {
              ...book,
              shelf: this.state.booksWithShelf[book.id]["shelf"],
            };
          }
          return {
            ...book,
            shelf: "None",
          };
        }),
      });
    });

    this.setState({
      searchText: e.target.value,
    });
  }

  handleDropdownChange(e) {
    const valueToFilter = e.target.value.split(",");
    const bookShelf = valueToFilter[0];
    const searchField = valueToFilter[1];
    const bookId = valueToFilter[2];
    const selectedBooks = { ...this.state.selectedSearchResults };
    const updatedBooks = [...this.state.searchResultsMap];
    this.state.searchResultsMap.forEach((book, index) => {
      if (
        (book && book.id && book.id.includes(bookId)) ||
        (book && book.author && book.author.includes(searchField))
      ) {
        const updatedBookShelf = { ...book, shelf: bookShelf };
        updatedBooks[index] = updatedBookShelf;
        selectedBooks[book.id] = updatedBookShelf;
        if (bookShelf === "None") {
          book.shelf = "non";
          update(book, "non");
        } else {
          update(book, bookShelf);
        }
      }
      return book;
    });
    //  set state of books from search
    this.setState({
      searchResultsMap: updatedBooks,
      selectedSearchResults: selectedBooks,
    });
  }
  render() {
    return (
      <div className="search-input">
        <p>Welcome to the Search Page</p>
        <input
          className="form-control"
          type="text"
          placeholder="Search for books"
          onChange={this.handleChange.bind(this)}
        />
        <BooksShelfContainer
          booksData={this.state.searchResultsMap}
          handleDropdownChange={this.handleDropdownChange.bind(this)}
        />
      </div>
    );
  }
}

export default Search;
