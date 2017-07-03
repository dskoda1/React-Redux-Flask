import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/categories';
import CreateCategoryModal from './Create'

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
export default class CategoriesView extends React.Component {
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

    render() {
        return (
            <div>
                {!this.props.loaded
                    ? <h1>Loading...</h1>
                    :
                    <div>
                      <div>
                        <CreateCategoryModal
                          submitNewCategory={this.createCategory}
                        />
                      </div>
                        <h1>Categories</h1>
                        <ul>
                          {this.props.categories.map(
                            (category) => <li key={category.id}>{category.name}</li>
                          )}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

CategoriesView.propTypes = {
    fetchCategoriesAction: React.PropTypes.func,
    createCategoryAction: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    categories: React.PropTypes.array,
    token: React.PropTypes.string,
    isFetching: React.PropTypes.bool
};
