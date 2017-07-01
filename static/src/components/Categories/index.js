import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/categories';

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

    fetchData() {
        const { token } = this.props;
        this.props.fetchCategories(token);
    }

    render() {
        return (
            <div>
                {!this.props.loaded
                    ? <h1>Loading data...</h1>
                    :
                    <div>
                        <h1>Categories</h1>
                        <ul>
                          {this.props.categories.map(
                            (category) => <li>{category.name}</li>
                          )}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

CategoriesView.propTypes = {
    fetchCategories: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    categories: React.PropTypes.array,
    token: React.PropTypes.string,
    isFetching: React.PropTypes.bool
};
