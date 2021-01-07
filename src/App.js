import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelves from './BookShelves';
import SearchBook from './SearchBook';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    bookList: [],
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
      //console.log(booksInfoArray)

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
        <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
              <BookShelves
                bookList={bookList}
                updateBookStatus={this.updateBookStatus}
              />
            <div className="open-search">
              <Link
              to='/search'
              ><button>Add a book</button></Link>

            </div>
          </div>
        )} />

        <Route path='/search' render={()=>(
          <SearchBook
            bookList={bookList}
            updateBookStatus={this.updateBookStatus}
          />
        )} />
      </div>
    )
  }
}
//<button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
export default BooksApp
