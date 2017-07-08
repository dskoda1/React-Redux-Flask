import React from 'react';

import { Paper } from 'material-ui';
import {
  FloatingActionButton,
} from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';

const style = {
    marginTop: 10,
    paddingBottom: 5,
    paddingTop: 5,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

const buttonStyle = {
  marginRight: 20
}

const buttonProps = {
  mini: true,
  secondary: true
}

export const Category = (props) => (
  <Paper style={style}>
    {props.name}
    <span className="pull-right">
      <FloatingActionButton
        {...buttonProps}
        style={buttonStyle}
        onTouchTap={() => props.deleteCategory(props.id, props.name)}
      >
        <ContentRemove />
      </FloatingActionButton>
    </span>
  </Paper>
)

Category.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  deleteCategory: React.PropTypes.func,
}
