import {
  CREATE_NOTIFICATION
} from '../constants'
import { createReducer } from '../utils/misc';

const initialState = {
    notificationOpen: false,
    message: ''
};

export default createReducer(initialState, {
    [CREATE_NOTIFICATION]: (state, payload) =>
        Object.assign({}, state, {
            notificationOpen: true,
            message: payload.message
        })
});
