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
    //localStorage.removeItem(this.props.book.id);

    console.log(localStorage)



  }

  componentDidMount () {
    this.documentData = JSON.parse(localStorage.getItem(this.props.book.id));
      console.log(this.documentData);
    if (localStorage.getItem(this.props.book.id)) {
    this.setState({rate:this.documentData.rate});
  }
  }

  render () {
    if (this.documentData) {
      console.log(this.documentData.rate)
    }

    return (

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
          {(this.documentData) && (<p className="rating">Rating:{this.state.rate} Stars</p>)}
       </form>

    )
  }
}

export default Rate;
