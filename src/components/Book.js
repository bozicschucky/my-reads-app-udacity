const Book = (props) => {
  return (
    <div className="book">
      <div className="book-image">
        <img src={props.image} alt="" />
      </div>
      <p className="book-title">{props.title}.</p>
      <p className="book-author">By {props.author}</p>

      <div className="selection">
        <label htmlFor="categories">move to</label>:
        <select
          name="categories"
          id="book-categories"
          onChange={props.handleDropdownChange}
        >
          <option>select book</option>
          <option value={`None,${props.title}`}>None</option>
          <option value={`read,${props.title}`}>read</option>
          <option value={`currentlyReading,${props.title}`}>
            currently reading
          </option>
          <option value={`wantToRead,${props.title}`}>want to read</option>
        </select>
      </div>
    </div>
  );
};

export default Book;
