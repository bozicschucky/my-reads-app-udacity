const Book = (props) => {
  return (
    <div className="book">
      <div className="book-image">
        <img src={props.image} alt="book image" height="150" width="100" />
      </div>
      <div className="book-title">
        <p>{props.title}</p>
      </div>
      <div className="book-author">
        <p>{props.author}</p>
      </div>
    </div>
  );
};

export default Book;
