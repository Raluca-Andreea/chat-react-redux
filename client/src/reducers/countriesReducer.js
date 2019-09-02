import { HANDLE_CHANGE, HANDLE_SUBMIT } from '../actions/actionTypes'
import countries from '../cities.json'

const initialState = {
  countries: countries,
  city: "",
  continent: "",
  temperature: 0,
  weather: ""

}


const CountriesReducer = (state=initialState, action) => {
    
  switch (action.type) {
    case HANDLE_CHANGE:   
      return {
          ...state,    
          [action.name]: action.value
        }

    case HANDLE_SUBMIT:

    let cities = [...state.countries]
    cities.push(action.payload)

      return {
        ...state, 
         
        countries: cities,
        city: "",
        continent: "",
        temperature: 0,
        weather: "",
      }

      default:
      return state
  }
  

}

export default CountriesReducer