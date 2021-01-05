import React, { Component } from "react";
//import * as BooksAPI from './BooksAPI';

class Category extends Component {

  updateBookShelf = (e) => {
    const bookObj = this.props.book;
    //console.log(bookObj)
    const shelf = e.target.value;

    this.setState((preState)=>({
      shelfValue: shelf,
    }))

    if (this.props.updateBookStatus) {
    this.props.updateBookStatus(bookObj, shelf);
    }
  }


  render() {
    const { book, matchShelf } = this.props;



    return (
      matchShelf? (<li key={book.id}>
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
            <select value={matchShelf || "none"} onChange={this.updateBookShelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">
              {matchShelf==="currentlyReading" && "\u2713"}
              Currently Reading</option>
              <option value="wantToRead">
              {matchShelf==="wantToRead" && "\u2713"}
              Want to Read</option>
              <option value="read">
              {matchShelf==="read" && "\u2713"}
              Read</option>
              <option value="none">
              {matchShelf==="none" && "\u2713"}
              None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
      </li>)
      :(
      <li>
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
              <select value={book.shelf || "none"} onChange={this.updateBookShelf}>
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
    )
    );
  }
}

export default Category;
/*
<li>
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' }}></div>
      <div className="book-shelf-changer">
        <select>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">Ender's Game</div>
    <div className="book-authors">Orson Scott Card</div>
  </div>
</li>
*/
