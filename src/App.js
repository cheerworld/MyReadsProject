import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelves from './BookShelves';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    bookList: [],
    //bookStatus: "none",
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(data=>{
      console.log(data);
      this.setState((preState)=>({
        bookList: preState.bookList.concat(data),
      }))
    })
  }

  updateBookStatus = async (book, shelf) => {

    try {
      const updatedAPIValue = await BooksAPI.update(book, shelf);
      const changeToArr = Object.values(updatedAPIValue).flat();
      const booksInfoArray = await Promise.all(changeToArr.map(bookId=>{
        return this.newBookInfo(bookId)
      }));
      console.log(booksInfoArray)

      this.setState((preState)=>({
        bookList: booksInfoArray,
      }))

    } catch (err) {
      console.log(err);
    }

  }


  newBookInfo = async (book) => {
    try {
      const bookInfo = await BooksAPI.get(book)
        .then(result=>result)

        console.log(bookInfo)
        return bookInfo;

    } catch (err) {
      console.log(err);
    }

  }






  render() {

    const { bookList } = this.state;

    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
              <BookShelves
                bookList={bookList}
                updateBookStatus={this.updateBookStatus}
              />
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
      </div>
    )
  }
}

export default BooksApp
