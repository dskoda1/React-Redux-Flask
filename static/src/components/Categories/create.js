import React from 'react';
import {
  FlatButton,
  RaisedButton,
  TextField,
  Dialog
} from 'material-ui';
import ContentRemove from 'material-ui/svg-icons/content/remove';


const g_defaultErrorText = 'Name can\'t be blank.'

export default class CreateCategoryModal extends React.Component {
  state = {
    open: false,
    name: '',
    errorText: null
  };

  updateState = (key, value) => {
    const next_state = {};
    next_state[key] = value;

    let name = this.state.name;
    if (key === 'name') {
      name = value;
    }
    next_state['errorText'] = name.length > 0 ? '' : g_defaultErrorText;
    this.setState(
      next_state
    );
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  }

  submit = () => {
    if (this.state.name.length > 0) {
      this.props.submitNewCategory(this.state.name)
      this.setState({
        errorText: null,
        open: false
      })
    }
    else {
      this.setState({'errorText': g_defaultErrorText})
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.submit}
      />,
    ];

    return (
      <div>
        <RaisedButton label="New" onTouchTap={this.handleOpen} />
        <Dialog
          title="Create new category"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Category"
            onChange={(e) => {this.updateState('name', e.target.value)}}
            errorText={this.state.errorText}
          />
        </Dialog>
      </div>
    );
  }
}

CreateCategoryModal.propTypes = {
  submitNewCategory: React.PropTypes.func.isRequired
}
