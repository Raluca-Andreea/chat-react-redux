import { OPEN_MODAL, CLOSE_MODAL } from '../actions/actionTypes'

const initialState = {
  modalIsOpen: false
}

const modalReducer = (state=initialState, action) => {

  switch (action.type){

      case OPEN_MODAL:       
      return {
          ...state,
          modalIsOpen: true
        }
      
      case CLOSE_MODAL:
        return {
            ...state,
            modalIsOpen: false
        }

      default:
      return state
  }
}

export default modalReducer