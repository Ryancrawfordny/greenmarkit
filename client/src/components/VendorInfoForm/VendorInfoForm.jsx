import React, { Component } from "react";
import './VendorInfoForm.css'
import VendorCategoryFilter from './VendorCategoryFilter';
import VendorDaysFilter from './VendorDaysFilter';

import { createVendor } from '../../services/vendorsService';

class VendorInfoForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      products: '',
      category: '',
      days: [],
    };

    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleCategoryValue = this.handleCategoryValue.bind(this);
    this.handleDaySelect = this.handleDaySelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleTextInput(e) {
    const fieldName = e.target.name;
    const value = e.target.value;
    this.setState({ [fieldName]: value });
  };

  handleCategoryValue(e) {
    this.setState({ category: parseInt(e.target.value) });
  };

  handleDaySelect(e){
    const { days } = this.state;
    let checked = e.target.checked;
    let selectedDay = e.target.value;
    if (checked) {
      this.setState({
        days: [...days, selectedDay],
      });
    } else {
      let index = days.indexOf(selectedDay);
      if (index > -1) {
        days.splice(index, 1);
        this.setState({
          days: days
        })
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    let { name, products, category, days} = this.state;
    const created = await createVendor({ name, products, category, days });
  };

  render() {
    return (
      <div>
        <h1>Vendor Information</h1>
        <form className="vendor-form" onSubmit={this.handleSubmit}>
          <div className="basic-info">
            <label>Vendor Name</label>
            <input type="text" name="name" onChange={this.handleTextInput} />
            <label>Products List</label>
            <input type="text" name="products" onChange={this.handleTextInput} />
          </div>
          <div className="filters">
            <VendorCategoryFilter
              handleCategoryValue={this.handleCategoryValue} />
            <VendorDaysFilter
              handleDaySelect={this.handleDaySelect} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default VendorInfoForm;
