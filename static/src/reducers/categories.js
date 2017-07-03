import {
  FETCH_CATEGORIES,
  RECEIVE_CATEGORIES
} from '../constants'
import { createReducer } from '../utils/misc';

const initialState = {
    data: null,
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
    [RECEIVE_CATEGORIES]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true,
        }),
    [FETCH_CATEGORIES]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
            loaded: false,
            data: null
        }),
});
