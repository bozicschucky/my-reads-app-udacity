import "./App.css";
import Books from "./components/BooksContainer";

function App() {
  return (
    <div className="container">
      <header className="">
        <h1 id="app-header">My Reads App </h1>
      </header>
      <main>
        <div className="main">
          <Books />
        </div>
      </main>
      {/* TODO  Work on the search functionality of the application*/}
    </div>
  );
}

export default App;
