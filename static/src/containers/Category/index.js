import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/categories';
import CreateCategoryModal from '../../components/Categories/Create'
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
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CategoryContainer extends React.Component {
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

    getLoadedComponent = () => {
      if (this.props.loaded) {
        return (
          <CategoriesListView
            categories={this.props.categories}
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
                <CreateCategoryModal
                  submitNewCategory={this.createCategory}
                />
              {this.getLoadedComponent()}
            </div>
        );
    }
}

CategoryContainer.propTypes = {
    fetchCategoriesAction: React.PropTypes.func,
    createCategoryAction: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    categories: React.PropTypes.array,
    token: React.PropTypes.string,
    isFetching: React.PropTypes.bool
};
