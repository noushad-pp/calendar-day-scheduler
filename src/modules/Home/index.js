import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row } from 'antd';

import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as userActions from '../../data/redux/user_details/actions';
import * as API from '../../data/config/api';

import Loader from './components/loader';
import Scheduler from './components/scheduler';

function mapStateToProps(state) {
    return {
        page_details: state.page_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, userActions), dispatch)
    };
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calenderEvents: API.getCalenderEvents()
        };
    }
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.home);
    }

    render() {
        const { page_details } = this.props;
        const { calenderEvents } = this.state;
        if (page_details.loaders.homepage_loading) {
            return (
                <Row className="HomeContainer page-container flex-column flex-center full-flex">
                    <Loader type="loading" className="font-30" />
                </Row>
            );
        }
        return (
            <Row className="HomeContainer page-container flex-column flex-jc full-flex b-mrgn-30">
                <Scheduler events={calenderEvents} />
            </Row>
        );
    }
}

Home.propTypes = {
    page_details: PropTypes.object,
    actions: PropTypes.object,
    history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null)(withRouter(Home));
