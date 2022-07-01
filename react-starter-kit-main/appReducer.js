import {ACCESS_DENIED, LOGGED_OUT} from '../actions/types'
import {clearStorage} from '../localstorage/get-set-storage'

export default function (state = {}, action) {

  switch (action.type) {
    case 'LOGGED_IN':
      return {...state, isLoggedOut: false}
    case LOGGED_OUT:
      return {isLoggedOut: true, tokenExpired: false}
    case ACCESS_DENIED: {
      clearStorage()
      return {...state, tokenExpired: true}
    }
    default:
      return state
  }
}
