import "./App.css";
import Book from "./components/BooksContainer";

function App() {
  return (
    <div className="">
      <header className="">
        <h3>My Reads App </h3>
      </header>

      <main>
        <div className="main">
          <div>currently Reading</div>
          <Book />
          <div>Want to read</div>
          <div>Read</div>
        </div>
      </main>

      {/* TODO  Work on the app header*/}
      {/* [X]  Add a few app styles to render the components*/}
      {/* TODO  Work on the component that renders the books*/}
      {/* TODO  Work on splitting the displayed books into currently reading,want to read, read*/}
      {/* TODO  Work on the moving of the books into the different categories listed above, this should enable a user to move the different books into categories of currently reading,want to read, read*/}
      {/* TODO  Work on the search functionality of the application*/}
    </div>
  );
}

export default App;
