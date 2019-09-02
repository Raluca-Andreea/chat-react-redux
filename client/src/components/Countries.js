import React, { Component } from 'react'
import CountryCard from './CountryCard'
import { connect } from 'react-redux'
import Form from './Form'


const mapStateToProps = (state) => {
  // console.log("Estoy en el mapStateToProps de Countries")
  // console.log(state.countries)
  const countries = state.countries.countries
  return {
    countries
  };
}


const Countries = (props) => {
  console.log(props)
  return (
    <>
      <h2>Add new country</h2>
      <Form></Form>
      <div className="container">
        <div className="row">
          {props.countries.map((city, idx) => {
            return <CountryCard key={idx} {...city} />
          })}
        </div>
      </div>
    </>
  )

}

export default connect(mapStateToProps, null)(Countries)

