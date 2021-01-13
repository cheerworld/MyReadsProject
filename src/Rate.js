import React, { Component } from "react";
import PropTypes from "prop-types";

class Rate extends Component {
  state = {
    rate: "",
    isRated: false
  };

  updateRate = e => {
    const rate = e.target.value;
    this.setState({ rate });
  };

  setLocalStore = () =>
    localStorage.setItem(this.props.book.id, this.state.rate);

  getLocalStore = () => localStorage.getItem(this.props.book.id);

  removeLocalStore = () => localStorage.removeItem(this.props.book.id);

  formSubmit = e => {
    e.preventDefault();
    if (this.state.rate !== "") {
      this.setLocalStore();
    }
    this.setState({ isRated: true });
    //console.log(localStorage);
  };

  componentDidMount() {
    const rating = this.getLocalStore();
    this.setState({
      rate: rating || "",
      isRated: rating !== null
    });
  }

  clickRemove = () => {
    this.removeLocalStore();
    this.setState({
      rate: "",
      isRated: false
    });
  };

  render() {
    const { rate, isRated } = this.state;

    return (
      <div>
        {isRated ? (
          <div>
            <p className="rating">
              Rating:{`${rate} Star${rate === "1" ? "" : "s"}`}
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
              value={rate}
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
