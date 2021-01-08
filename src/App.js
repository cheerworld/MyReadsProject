import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelves from './BookShelves';
import SearchBook from './SearchBook';
import { Route, Link } from 'react-router-dom';

const shelves = [
  {
    title: "Currently Reading",
    id: "currentlyReading"
  },
  {
    title: "Want To Read",
    id: "wantToRead"
  },
  {
    title: "Read",
    id:"read"
  }
];

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
      await BooksAPI.update(book, shelf);

      this.setState(({ bookList })=>{
        let updateBookList = bookList.filter(({ id }) => id!==book.id);
        console.log(updateBookList);
        if (shelf!=="none") {
          updateBookList = updateBookList.concat({...book, shelf})
          console.log(updateBookList)
        }

        return {bookList: updateBookList};
      });

    } catch (err) {
      console.error(err);
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
                shelves={shelves}
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

export default BooksApp
