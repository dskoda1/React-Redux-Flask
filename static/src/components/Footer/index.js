import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import {
  Snackbar
} from 'material-ui';

function mapStateToProps(state) {
    return {
        notificationOpen: state.notification.notificationOpen,
        message: state.notification.message,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

/* component styles */
import { styles } from './styles.scss';

@connect(mapStateToProps, mapDispatchToProps)
export class Footer extends Component {

    render() {
      return (
        <footer className={`${styles}`}>
            <div className="container">
                <div className="row">
                    <Snackbar
                      open={this.props.notificationOpen}
                      message={this.props.message}
                      autoHideDuration={4000}
                    />
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <p>© DZT 2016</p>
                    </div>
                </div>
            </div>
        </footer>
      )
    }
}

Footer.propTypes = {
  notificationOpen: React.PropTypes.bool,
  message: React.PropTypes.string,
}
