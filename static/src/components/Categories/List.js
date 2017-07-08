import React from 'react';

import { Category } from './Category';

export const CategoriesListView = (props) => (
      <div>
        {
          props.categories.length
          ?
            props.categories.map(
            (category) =>
              <Category
                {...category}
                deleteCategory={props.deleteCategory}
                key={category.id}
              />
            )
          :
          <div>
            "Why don't you add a category?"
          </div>

      }
      </div>
    )

CategoriesListView.propTypes = {
  categories: React.PropTypes.array,
  deleteCategory: React.PropTypes.func,
  // createPurchaseAction: React.PropTypes.func,
};
