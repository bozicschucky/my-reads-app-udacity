const Book = (props) => {
  const selectOptions = ["None", "read", "currentlyReading", "wantToRead"];
  //generate select element with options
  const selectOptionsArray = [
    props.shelf,
    ...selectOptions.filter((option) => option !== props.shelf),
  ];
  const options = (props) =>
    selectOptionsArray.map((option) => {
      return (
        <option key={option} value={`${option},${props.title},${props.bookId}`}>
          {option}
        </option>
      );
    });
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
          {options(props)}
        </select>
      </div>
    </div>
  );
};

export default Book;
