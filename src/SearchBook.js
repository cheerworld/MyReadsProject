import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookInfo from "./BookInfo";
import PropTypes from "prop-types";

class SearchBook extends Component {
  state = {
    query: "",
    searchResults: []
  };

  updateQuery = e => {
    const query = e.target.value;

    this.setState({ query }, async () => {
      let searchResults = [];

      if (this.state.query !== "") {
        try {
          searchResults = await BooksAPI.search(this.state.query);
          //console.log(this.state.query, query)
        } catch (err) {
          console.error(err);
        }
      }

      if (query === this.state.query) {
        this.setState({ searchResults });
      }
    });
  };

  render() {
    const { searchResults } = this.state;
    //console.log(searchResults)

    const controlledList = searchResults.error ? (
      <p>No Search Found</p>
    ) : (
      searchResults.map(book => {
        const bookOnShelf = this.props.bookList.find(
          ({ id }) => id === book.id
        );

        const matchShelf = bookOnShelf ? bookOnShelf.shelf : "none";
        //console.log("found", matchShelf);

        return (
          <BookInfo
            key={book.id}
            book={{ ...book, shelf: matchShelf }}
            updateBookStatus={this.props.updateBookStatus}
          />
        );
      })
    );

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            <input
              autoFocus
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{controlledList}</ol>
        </div>
      </div>
    );
  }
}

SearchBook.propTypes = {
  bookList: PropTypes.array.isRequired,
  updateBookStatus: PropTypes.func.isRequired
};

export default SearchBook;
