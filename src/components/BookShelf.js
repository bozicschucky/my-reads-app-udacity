import Book from "./Book";
export default function BookShelf(props) {
  const booksByShelf = props.books.filter(
    (book) => book.shelf.toLowerCase() === props.shelf.toLowerCase()
  );
  return (
    <div className="book-shelf">
      <h1>{props.title}</h1>
      {booksByShelf.map((book) => (
        <Book
          key={book.id}
          title={book.title}
          author={book.authors.join()}
          image={book.imageLinks.thumbnail}
          shelf={book.shelf}
          handleDropdownChange={props.handleDropdownChange}
        />
      ))}
    </div>
  );
}
