import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as categoryActions from '../../actions/categories';
import * as notificationActions from '../../actions/notification';

// This one is exported as default
import CreateCategoryModal from '../../components/Categories/Create'
// This one is not exported as default, note pure functions can't be?
import { CategoriesListView } from '../../components/Categories/List'


function mapStateToProps(state) {
    return {
      token: state.auth.token,
      categories: state.categories.data,
      loaded: state.categories.loaded,
      isFetching: state.categories.isFetching
    };
}

function mapDispatchToProps(dispatch) {
    return {
      notificationActions: bindActionCreators(notificationActions, dispatch),
      categoryActions: bindActionCreators(categoryActions, dispatch)
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CategoriesPage extends React.Component {

    componentDidMount() {
      this.fetchData();
    }

    fetchData = () => {
        const { token } = this.props;
        this.props.categoryActions.fetchCategoriesAction(token);
    }

    createCategory = (name) => {
      const { token } = this.props;
      this.props.categoryActions.createCategoryAction(token, name);
      this.props.notificationActions.createNotification(`Created category '${name}' successfully.`)

    }

    deleteCategory = (id, name) => {
      const { token } = this.props;
      this.props.categoryActions.deleteCategoryAction(token, id);
      this.props.notificationActions.createNotification(`Deleted category '${name}' successfully.`)
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
            <div>
                <h1>
                  <span className="pull-left">
                    Categories
                  </span>
                  <span className="pull-right">
                    <CreateCategoryModal
                      submitNewCategory={this.createCategory}
                    />
                  </span>
                </h1>
              {this.getLoadedComponent()}
            </div>
        );
    }
}

// TODO: Nested validation here
CategoriesPage.propTypes = {
    // Redux Action functions
    categoryActions: React.PropTypes.object,/*.PropTypes = {*/
    //   fetchCategoriesAction: React.PropTypes.func,
    //   createCategoryAction: React.PropTypes.func,
    //   deleteCategoryAction: React.PropTypes.func
    // },
    notificationActions: React.PropTypes.object,/*.PropTypes = {*/
    //   startNotification: React.PropTypes.func,
    //   endNotification: React.PropTypes.func,
    // },
    // createPurchaseAction: React.PropTypes.func,
    // Other props
    loaded: React.PropTypes.bool,
    isFetching: React.PropTypes.bool,
    categories: React.PropTypes.array,
    token: React.PropTypes.string
};
