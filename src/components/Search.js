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
    //
    search(e.target.value).then((data) => {
      console.log(
        "🚀 ~ file: search.js ~ line 22 ~ Search ~ search ~ data",
        data
      );
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
    console.log("change in dropDown -->", e.target.value);
    const valueToFilter = e.target.value.split(",");
    const bookShelf = valueToFilter[0];
    const booksFromMainPage = [...this.state.booksWithShelf];
    const searchField = valueToFilter[1];
    const selectedBooks = { ...this.state.selectedSearchResults };
    const updatedBooks = [...this.state.searchResultsMap];
    this.state.searchResultsMap.forEach(
      // find first book with matching title and set the shelf of the book
      (book, index) => {
        if (
          (book && book.title && book.title.includes(searchField)) ||
          (book && book.author && book.author.includes(searchField))
        ) {
          const updatedBookShelf = { ...book, shelf: bookShelf };
          updatedBooks[index] = updatedBookShelf;
          selectedBooks[book.id] = updatedBookShelf;

          //iterate through the books from main page and find the book with matching book.title
          for (let i = 0; i < booksFromMainPage.length; i++) {
            const bookFromMainPage = booksFromMainPage[index];
            if (bookFromMainPage.id === book.id) {
              console.log("updating the new book", bookFromMainPage, i);
              booksFromMainPage[i] = updatedBookShelf;
              break;
            } else {
              console.log(
                "bookFromMainPage adding the new book",
                bookFromMainPage
              );
              booksFromMainPage.push(updatedBookShelf);
              break;
            }
          }
        }
        return book;
      }
    );
    localStorage.setItem("books", JSON.stringify(booksFromMainPage));
    //  set state of books from search
    this.setState({
      searchResultsMap: updatedBooks,
      selectedSearchResults: selectedBooks,
    });
  }
  render() {
    console.log("state", this.state);
    return (
      <div className="search-input">
        <p>Welcome to the Search Page</p>
        <input
          className="form-control"
          type="text"
          placeholder="Search for books"
          // value={}
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
