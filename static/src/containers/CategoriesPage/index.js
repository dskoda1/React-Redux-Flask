import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/categories';
// This one is exported as default
import CreateCategoryModal from '../../components/Categories/Create'
// This one is not exported as default, note pure functions can't be?
import { CategoriesListView } from '../../components/Categories/List'
import {
  Snackbar
} from 'material-ui';

function mapStateToProps(state) {
    return {
      token: state.auth.token,
      categories: state.categories.data,
      loaded: state.categories.loaded,
      isFetching: state.categories.isFetching
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CategoriesPage extends React.Component {

    componentWillMount() {
        this.state = {
            snackBarOpen: false,
            snackBarMessage: ''
        };
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData = () => {
        const { token } = this.props;
        this.props.fetchCategoriesAction(token);
    }

    createCategory = (name) => {
      const { token } = this.props;
      this.props.createCategoryAction(token, name);
    }

    deleteCategory = (id, name) => {
      const { token } = this.props;
      // TODO: dispatch an action for the snack bar in here
      this.props.deleteCategoryAction(token, id);
      this.setState({
        snackBarOpen: true,
        snackBarMessage: `Deleted category '${name}' successfully.`
      })
    }

    getLoadedComponent = () => {
      if (this.props.loaded) {
        return (
          <CategoriesListView
            categories={this.props.categories}
            deleteCategory={this.deleteCategory}
          />
        )
      }
      else {
        <h1>Loading...</h1>
      }
    }

    render() {
        return (
            <div className="flex">

              <div className="col-md-6">
                <h1>Categories</h1>
              </div>
              <div className="col-md-6">
                <span className="pull-right">
                <CreateCategoryModal
                  submitNewCategory={this.createCategory}
                />
                </span>
              </div>

              {this.getLoadedComponent()}
              <Snackbar
                open={this.state.snackBarOpen}
                message={this.state.snackBarMessage}
                autoHideDuration={4000}
              />
            </div>
        );
    }
}

CategoriesPage.propTypes = {
    // Redux Action functions
    fetchCategoriesAction: React.PropTypes.func,
    createCategoryAction: React.PropTypes.func,
    deleteCategoryAction: React.PropTypes.func,
    // createPurchaseAction: React.PropTypes.func,
    // Other props
    loaded: React.PropTypes.bool,
    isFetching: React.PropTypes.bool,
    categories: React.PropTypes.array,
    token: React.PropTypes.string
};
