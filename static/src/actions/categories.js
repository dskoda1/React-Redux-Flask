import {
  FETCH_CATEGORIES,
  RECEIVE_CATEGORIES,
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL
} from '../constants/index'

import { parseJSON } from '../utils/misc';
import { get_category_list, create_category } from '../utils/http_functions';


/*********************************
* Actions related to /categories GET
**********************************/
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

export function fetchCategoriesAction(token) {
    console.log('in fetch categories action');
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

/*********************************
* Actions related to /categories POST
**********************************/
export function createCategoryRequest() {
  return {
      type: CREATE_CATEGORY
  }
}

export function createCategoryAction(token, name) {
  console.log('In create category action');
  return (dispatch) => {
    dispatch(createCategoryRequest())
    create_category(token, name)
        .then(parseJSON)
        .then(response => {
          fetchCategoriesAction(token)(dispatch);
        })
        .catch(error => {
          console.log('Failed to create category')
          console.log(error);
        })
  }
}
