import React, { Component } from "react";
import ControlSelect from './ControlSelect';

class BookInfo extends Component {


  render() {
    const { book, updateBookStatus } = this.props;

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
