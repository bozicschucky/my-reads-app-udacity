const Book = (props) => {
  return (
    <div className="book">
      <div className="book-image">
        <img src={props.image} alt="" />
      </div>
      <p className="book-title">{props.title}.</p>
      <p className="book-author">By {props.author}</p>

      <div className="selection">
        <label htmlFor="categories">select book to</label>:
        <select
          name="categories"
          id="book-categories"
          onChange={props.handleDropdownChange}
        >
          <option>Move</option>
          <option value={`None,${props.title}`}>None</option>
          <option value={`read,${props.title}`}>read</option>
          <option value={`wishlist,${props.title}`}>want to read</option>
          <option value={`currentlyReading,${props.title}`}>
            currently reading
          </option>
        </select>
      </div>
    </div>
  );
};

export default Book;
