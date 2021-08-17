import { Link, Route } from "react-router-dom";
import "./App.css";
import Books from "./components/BooksContainer";
import Search from "./components/Search";

function App() {
  return (
    <div className="container">
      <header className="">
        <h1 id="app-header">My Reads App </h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="main">
          <Route exact path="/search">
            <Search />
          </Route>

          <Route exact path="/">
            <Books />
          </Route>
        </div>
      </main>
    </div>
  );
}

export default App;
