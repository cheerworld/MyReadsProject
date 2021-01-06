import React, { Component } from "react";

class ControlSelect extends Component {

  updateBookShelf = (e) => {
    const bookObj = this.props.book;
    //console.log(bookObj)
    const shelf = e.target.value;

    if (this.props.updateBookStatus) {
    this.props.updateBookStatus(bookObj, shelf);
    }
  }

  render () {

    const { book, matchShelf } = this.props;

    return (
      <div className="book-shelf-changer">
        <select value={book.shelf || matchShelf || "none"} onChange={this.updateBookShelf}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">
          {(book.shelf==="currentlyReading" || matchShelf ==="currentlyReading") && "\u2713"}
          Currently Reading</option>
          <option value="wantToRead">
          {(book.shelf==="wantToRead" || matchShelf ==="wantToRead") && "\u2713"}
          Want to Read</option>
          <option value="read">
          {(book.shelf ==="read" || matchShelf ==="read") && "\u2713"}
          Read</option>
          <option value="none">
          {(book.shelf ==="none" || matchShelf ==="none") && "\u2713"}
          None</option>
        </select>
      </div>
    )
  }
}

export default ControlSelect;
/*
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
*/
