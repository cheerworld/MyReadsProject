import React from "react";
import BookInfo from "./BookInfo";

function BookShelves(props) {
  const { bookList, updateBookStatus, shelves } = props;

  return (
    <div className="list-books-content">
      <div>
        {shelves.map(shelf => (
          <div className="bookshelf" key={shelf.id}>
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {bookList.map(
                  book =>
                    shelf.id === book.shelf && (
                      <BookInfo
                        key={book.id}
                        book={book}
                        updateBookStatus={updateBookStatus}
                      />
                    )
                )}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookShelves;
