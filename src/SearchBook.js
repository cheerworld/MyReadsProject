
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Category from './Category';


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
        if (this.state.query!==""){
          const findBooks = await BooksAPI.search(this.state.query);
          console.log(findBooks)
          this.setState((preState)=>({
            searchResults: findBooks,
          }))
        }

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
    : (searchResults.map(book=>{
      const bookOnShelf = this.props.bookList.find(({ id })=>id===book.id)

      const matchShelf = bookOnShelf? bookOnShelf.shelf : "none";
      console.log("found", matchShelf)

      return (
        <Category
          key={book.id}
          book={book}
          matchShelf={matchShelf}
          updateBookStatus={this.props.updateBookStatus}
        />

      )
    }))


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
