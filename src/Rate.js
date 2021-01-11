import React, { Component } from "react";

class Rate extends Component {
  documentData;

  state = {
    rate: "",
  }

  updateRate = (e) => {
    const value = e.target.value;
    this.setState((preState)=>({
      rate: value,
    }))
  }

  formSubmit = (e) => {
    e.preventDefault();
    if (this.state.rate!=="") {
    localStorage.setItem(this.props.book.id,JSON.stringify(this.state));
    }


    console.log(localStorage)

  }

  componentDidMount () {
    this.documentData = JSON.parse(localStorage.getItem(this.props.book.id));
      console.log(this.documentData);
    if (localStorage.getItem(this.props.book.id)) {
    this.setState({rate:this.documentData.rate});
  }

  }

  clickRemove = () => {
    localStorage.removeItem(this.props.book.id);
    if (!localStorage.getItem(this.props.book.id)) {
      this.setState({rate: ""})
    }
  }

  render () {
    if (this.documentData) {
      console.log(this.documentData.rate)
    }

    return (


         <div>
          {(this.documentData)?
            ( <div>
              <p className="rating">Rating:{this.documentData.rate} Stars</p>
              <button onClick={this.clickRemove}>Remove</button>
              </div>
            )
            : (
              <form className="rateForm" onSubmit={this.formSubmit}>
              <input type="number"
              className="rateInput"
              placeholder="Rate it"
              min="1"
              max="5"
              value={this.state.rate}
              onChange={this.updateRate}
              />
              <button type="Submit">Rate it</button>
              </form>
              )
           }
          </div>
  )
  }
}

export default Rate;
