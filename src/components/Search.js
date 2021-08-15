// create a search component react

const Search = (props) => {
  const {
    onSearch,
    placeholder = "search by author,title",
    value,
    style,
  } = props;
  return (
    <div className="search-input" style={style}>
      <input
        className="form-control"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onSearch}
      />
    </div>
  );
};

export default Search;
