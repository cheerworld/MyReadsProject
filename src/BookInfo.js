import React, { Component } from "react";
import ControlSelect from './ControlSelect';
//import * as BooksAPI from './BooksAPI';

class BookInfo extends Component {


  render() {
    const { book, matchShelf, shelf, updateBookStatus } = this.props;

    return (

      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
              }}
            />

            <ControlSelect
              book={book}
              shelf={shelf}
              matchShelf={matchShelf}
              updateBookStatus={updateBookStatus}
             />

          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors || 'No Author Listed'}</div>
        </div>
      </li>
    )

  }
}

export default BookInfo;
