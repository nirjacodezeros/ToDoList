import {
  ADD_COORDINATE
} from '../action/reducer.types'

export default function (state = {}, action) {
  switch (action.type) {
    case ADD_COORDINATE:
      return {
        ...state,
        coordinateDate: action.payload,
      }
    default:
      return state
  }
}
