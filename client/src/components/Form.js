import React, { Component } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from "redux"
import { handleChange, handleSubmit } from '../actions/actionCreator'



const mapStateToProps = (state) => {
  return {
    state
  };
}

const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      handleChange,
      handleSubmit
    },
    dispatch
  );
};



class Form extends Component {

  render() {

    const city = this.props.state.form

    return (
      <>
     
        <label>City</label>
        <input type="text" value={this.props.state.form.city} name="city" onChange={this.props.handleChange}></input>
        <input type="text" value={this.props.state.form.continent} name="continent" onChange={this.props.handleChange}></input>
        <input type="number" value={this.props.state.form.temperature} name="temperature" onChange={this.props.handleChange}></input>
        <input type="text" value={this.props.state.form.weather} name="weather" onChange={this.props.handleChange}></input>



        <button onClick={() => this.props.handleSubmit(city)}>Add new country</button>
 
        
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
