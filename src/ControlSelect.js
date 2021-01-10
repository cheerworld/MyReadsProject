import React, { Component } from "react";
import { shelves } from './Shelves';

class ControlSelect extends Component {

  updateBookShelf = (e) => {
    const bookObj = this.props.book;
    //console.log(bookObj)
    const shelfValue = e.target.value;

    if (this.props.updateBookStatus) {
    this.props.updateBookStatus(bookObj, shelfValue);
    }
  }

  render () {

    const { book } = this.props;

    return (
      <div className="book-shelf-changer">
        <select value={book.shelf} onChange={this.updateBookShelf}>
          <option value="move" disabled>
            Move to...
          </option>

          {shelves.map(({ id, title })=>(
            <option key={id} value={id}>
              {(book.shelf===id) && "\u2713"}
              {title}
            </option>
          ))}

          <option value="none">
          {(book.shelf ==="none") && "\u2713"}
          None</option>
        </select>
      </div>
    )
  }
}

export default ControlSelect;
