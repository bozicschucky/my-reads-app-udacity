const selectOptions = ["None", "read", "currentlyReading", "wantToRead"];
const Book = (props) => {
  //generate select element with options
  const options = (props) =>
    selectOptions.map((option) => {
      const selectedOption = props.shelf === option ? option : "";
      console.log(
        "🚀 ~ file: book.js ~ line 7 ~ selectOptions.map ~ selectedOption",
        selectedOption
      );
      return (
        <option
          key={option}
          value={`${option},${props.title}`}
          selected={selectedOption}
        >
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
