import React from "react";
import ControlSelect from "./ControlSelect";
import Rate from "./Rate";
import PropTypes from "prop-types";


function BookInfo(props) {
  const { book, updateBookStatus } = props;

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks &&
                book.imageLinks.thumbnail})`
            }}
          />

          <ControlSelect book={book} updateBookStatus={updateBookStatus} />
        </div>
        {book.shelf === "read" && <Rate book={book} />}

        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors || "No Author Listed"}</div>
      </div>
    </li>
  );
}

BookInfo.propTypes = {
  book: PropTypes.object.isRequired,
  updateBookStatus: PropTypes.func.isRequired,
}

export default BookInfo;
