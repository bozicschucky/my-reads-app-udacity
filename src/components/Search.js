// create a search component react
import React, { Component } from "react";
import { search } from "../BooksAPI";
import BooksShelfContainer from "./BookShelfContainer";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksWithShelf: JSON.parse(localStorage.getItem("books")) || [],
      searchResultsMap: [],
      selectedSearchResults: {},
    };
  }

  handleChange(e) {
    search(e.target.value).then((data) => {
      const dataFromServer = !data || data["error"] ? [] : data;
      this.setState({
        searchResultsMap: dataFromServer.map((book) => {
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
    const booksFromMainPage = [...this.state.booksWithShelf];
    const searchField = valueToFilter[1];
    const bookId = valueToFilter[2];
    const selectedBooks = { ...this.state.selectedSearchResults };
    const updatedBooks = [...this.state.searchResultsMap];
    const booksFromMainPageMap = {};

    booksFromMainPage.forEach((bookElement) => {
      booksFromMainPageMap[bookElement.id] = bookElement;
    });

    this.state.searchResultsMap.forEach((book, index) => {
      if (
        (book && book.id && book.id.includes(bookId)) ||
        (book && book.author && book.author.includes(searchField))
      ) {
        const updatedBookShelf = { ...book, shelf: bookShelf };
        updatedBooks[index] = updatedBookShelf;
        selectedBooks[book.id] = updatedBookShelf;
        booksFromMainPageMap[book.id] = updatedBookShelf;
      }
      return book;
    });
    localStorage.setItem(
      "books",
      JSON.stringify(Object.values(booksFromMainPageMap))
    );
    //  set state of books from search
    this.setState({
      searchResultsMap: updatedBooks,
      selectedSearchResults: selectedBooks,
    });
  }
  render() {
    // console.log("state", this.state);
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
