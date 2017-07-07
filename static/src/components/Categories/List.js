import React from 'react';

import { Category } from './Category';

export const CategoriesListView = (props) => (
      <div>
        {props.categories.map(
          (category) =>
            <Category
              {...category}
              deleteCategory={props.deleteCategory}
              key={category.id}
            />
        )}

      </div>
    )

CategoriesListView.propTypes = {
  categories: React.PropTypes.array,
  deleteCategory: React.PropTypes.func,
  // createPurchaseAction: React.PropTypes.func,
};
