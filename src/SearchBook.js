
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';


class SearchBook extends Component {

  state = {
    query: "",
    searchResults: [],
  }



  updateQuery = async (e) => {

    try {
      const value = e.target.value;
      await this.setState((preState)=>({
        query: value,
      }),
      async ()=>{
        const findBooks = await BooksAPI.search(this.state.query);
        console.log(findBooks)
        this.setState((preState)=>({
          searchResults: findBooks,
        }))
      }
    )
    } catch (err) {
      console.log(err)
    }
  }





  render () {
    //console.log(findBooks)
    const { searchResults } = this.state;
    console.log(searchResults)
    const controlledList =
    searchResults.error
    ? <p>No Search Found</p>
    : (searchResults.map(book=>(
      <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}
          />
          <div className="book-shelf-changer">
            <select value={book.shelf || "none"}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">
              {book.shelf==="currentlyReading" && "\u2713"}
              Currently Reading</option>
              <option value="wantToRead">
              {book.shelf==="wantToRead" && "\u2713"}
              Want to Read</option>
              <option value="read">
              {book.shelf==="read" && "\u2713"}
              Read</option>
              <option value="none">
              {book.shelf==="none" && "\u2713"}
              None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
      </li>
    )))


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>

          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.updateQuery}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {controlledList}
          </ol>
        </div>
      </div>

    )
  }
}

export default SearchBook;
/*

*/
