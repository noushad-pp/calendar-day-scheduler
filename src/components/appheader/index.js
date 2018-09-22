import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row} from 'antd';

import './index.scss';

export default class AppHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { loadPath } = this.props;
        return (
            <Row className="HeaderContainer" type="flex" justify="space-between" align="center">
                <Row type="flex" justify="center" align="center" className="LogoContainer is-cursor-ptr" onClick={() => loadPath('/')}>
                    <div className="LogoText font-lg tb-pad-5">DAY CALENDAR</div>
                </Row>
            </Row>
        );
    }
}

AppHeader.propTypes = {
    page_details: PropTypes.object,
    loadPath: PropTypes.func
};

