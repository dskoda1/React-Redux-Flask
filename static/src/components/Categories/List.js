import React from 'react';

export const CategoriesListView = (props) =>

      <div>
          <h1>Categories</h1>
          <ul>
            {props.categories.map(
              (category) => <li key={category.id}>{category.name}</li>
            )}
          </ul>
      </div>

CategoriesListView.propTypes = {
  categories: React.PropTypes.array
};
