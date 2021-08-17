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
          author={(book.authors && book.authors.join()) || "Unknown"}
          image={(book.imageLinks && book.imageLinks.thumbnail) || "No image"}
          shelf={book.shelf}
          bookId={book.id}
          handleDropdownChange={props.handleDropdownChange}
        />
      ))}
    </div>
  );
}
