import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelves from "./BookShelves";
import SearchBook from "./SearchBook";
import { Switch, Route, Link } from "react-router-dom";
import { shelves } from "./Shelves";
import ErrorPage404 from "./ErrorPage404";

class BooksApp extends React.Component {
  state = {
    bookList: []
  };

  async componentDidMount() {
    const bookList = await BooksAPI.getAll();
    this.setState({ bookList });
  }

  updateBookStatus = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);

      this.setState(({ bookList }) => {
        let updateBookList = bookList.filter(({ id }) => id !== book.id);

        if (shelf !== "none") {
          updateBookList = updateBookList.concat({ ...book, shelf });
          //console.log(updateBookList)
        }

        return { bookList: updateBookList };
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { bookList } = this.state;

    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <BookShelves
                  shelves={shelves}
                  bookList={bookList}
                  updateBookStatus={this.updateBookStatus}
                />
                <Link to="/doesNotExist">
                  <button className="error404">404</button>
                </Link>
                <div className="open-search">
                  <Link to="/search">
                    <button>Add a book</button>
                  </Link>
                </div>
                <footer>
                  <p className="footerP">
                    <span role="img" aria-label="Diya Lamp">
                      🪔{" "}
                    </span>
                    Made by Yuguo Zhao
                    <span role="img" aria-label="Books">
                      {" "}
                      📚
                    </span>
                  </p>
                </footer>
              </div>
            )}
          />

          <Route
            path="/search"
            render={() => (
              <SearchBook
                bookList={bookList}
                updateBookStatus={this.updateBookStatus}
              />
            )}
          />

          <Route component={ErrorPage404} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
