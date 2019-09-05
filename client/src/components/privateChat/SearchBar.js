import React from 'react'
import { bindActionCreators } from "redux"
import { handleSearch } from '../../actions/actionCreator'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    name: state.allUsers.name
  };
}

const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      handleSearch
    },
    dispatch
  );
}

const SearchBar = (props) => {

  return (
    <div>
      <input type="text" className="search-bar" placeholder="Search for users..." name="name" value={props.name} onChange={props.handleSearch}></input>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)

