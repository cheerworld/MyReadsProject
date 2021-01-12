import React, { Component } from "react";
import PropTypes from "prop-types";

class Rate extends Component {
  documentData;

  state = {
    rate: ""
  };

  updateRate = e => {
    const value = e.target.value;
    this.setState(preState => ({
      rate: value
    }));
  };

  formSubmit = e => {
    e.preventDefault();
    if (this.state.rate !== "") {
      localStorage.setItem(this.props.book.id, JSON.stringify(this.state));
    }

    this.documentData = JSON.parse(localStorage.getItem(this.props.book.id));
    if (localStorage.getItem(this.props.book.id)) {
      this.setState({ rate: this.documentData.rate });
    }
    //console.log(localStorage);
  };

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem(this.props.book.id));
    //console.log(this.documentData);
    if (localStorage.getItem(this.props.book.id)) {
      this.setState({ rate: this.documentData.rate });
    }
  }

  clickRemove = () => {
    localStorage.removeItem(this.props.book.id);
    if (!localStorage.getItem(this.props.book.id)) {
      this.setState({ rate: "" });
      this.documentData.rate = "";
    }
  };

  render() {
    const docRate = this.documentData ? this.documentData.rate : "";

    return (
      <div>
        {this.documentData && docRate !== "" ? (
          <div>
            <p className="rating">
              Rating:{docRate === "1" ? `${docRate} Star` : `${docRate} Stars`}
            </p>
            <button className="remove" onClick={this.clickRemove}>
              Remove
            </button>
          </div>
        ) : (
          <form className="rateForm" onSubmit={this.formSubmit}>
            <input
              type="number"
              className="rateInput"
              placeholder="Rate it"
              min="1"
              max="5"
              value={this.state.rate}
              onChange={this.updateRate}
            />
            <button className="submit" type="Submit">
              Rate it
            </button>
          </form>
        )}
      </div>
    );
  }
}

Rate.propTypes = {
  book: PropTypes.object.isRequired
};

export default Rate;
