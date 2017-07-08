import {
  CREATE_NOTIFICATION
} from '../constants'

export function createNotification(message) {
  return {
    type: CREATE_NOTIFICATION,
    payload: {
      message
    }
  }
}
