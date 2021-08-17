import BooksByShelf from "./BookShelf";

function BookShelfContainer(props) {
  return (
    <div className="book-grid">
      <BooksByShelf
        books={props.booksData}
        shelf="None"
        title="All Books"
        handleDropdownChange={props.handleDropdownChange}
      />

      <BooksByShelf
        books={props.booksData}
        shelf="read"
        title="Read"
        handleDropdownChange={props.handleDropdownChange}
      />

      <BooksByShelf
        books={props.booksData}
        shelf="currentlyReading"
        title="Currently Reading"
        handleDropdownChange={props.handleDropdownChange}
      />

      <BooksByShelf
        books={props.booksData}
        shelf="wantToRead"
        title="Want to read"
        handleDropdownChange={props.handleDropdownChange}
      />
    </div>
  );
}

export default BookShelfContainer;
