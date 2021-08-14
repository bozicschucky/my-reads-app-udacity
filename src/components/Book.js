const Book = (props) => {
  return (
    <div className="book">
      <div className="book-image">
        <img src={props.image} />
      </div>
      <div className="book-title">
        <p>{props.title}</p>
      </div>
      <div className="book-author">
        <p>{props.author}</p>
      </div>
      <label htmlFor="categories">Move</label>

      <select
        name="categories"
        id="book-categories"
        onChange={props.handleDropdownChange}
      >
        <option value={`None,${props.title}`}>None</option>
        <option value={`read,${props.title}`}>read</option>
        <option value={`wishlist,${props.title}`}>wishlist</option>
        <option value={`currentlyReading,${props.title}`}>
          currently reading
        </option>
      </select>
    </div>
  );
};

export default Book;
