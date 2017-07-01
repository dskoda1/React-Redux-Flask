import {
  FETCH_CATEGORIES,
  RECEIVE_CATEGORIES
} from '../constants/index'

import { parseJSON } from '../utils/misc';
import { get_category_list } from '../utils/http_functions';

export function fetchCategoriesRequestFail() {
  console.log('TODO: Failed api request')
}

export function receiveCategories(data) {
    return {
        type: RECEIVE_CATEGORIES,
        payload: {
            data,
        },
    };
}

export function fetchCategoriesRequest() {
    return {
        type: FETCH_CATEGORIES,
    };
}

export function fetchCategories(token) {
    return (dispatch) => {
        dispatch(fetchCategoriesRequest());
        get_category_list(token)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveCategories(response.result));
            })
            .catch(error => {
              console.log(error);
                if (error.status === 401) {
                    dispatch(fetchCategoriesRequestFail(error));
                }
            });
    };
}
