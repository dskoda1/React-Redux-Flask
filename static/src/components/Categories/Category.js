import React from 'react';

import { Paper } from 'material-ui';
import {
  RaisedButton,
} from 'material-ui';
const style = {
    marginTop: 10,
    paddingBottom: 5,
    paddingTop: 5,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

export const Category = (props) => (
  <Paper style={style}>
    {props.name}
    <span className="pull-right">
      <RaisedButton
        label="Delete"
        onTouchTap={() => props.deleteCategory(props.id, props.name)}
      />
    </span>
  </Paper>
)

Category.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  deleteCategory: React.PropTypes.func,
}
