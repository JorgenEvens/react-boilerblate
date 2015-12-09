'use strict';

import _ from 'lodash';
import React from 'react';
import 'components/app.styl';
import { connect } from 'react-redux';
import MessageActions from 'actions/message';
import { bindActionCreators } from 'redux';

@connect(
    state => _.pick(state, 'message'),
    dispatch => bindActionCreators(MessageActions, dispatch)
)
export default
class App extends React.Component {

    static displayName = 'App';

    static propTypes = {
        message: React.PropTypes.string,

        add: React.PropTypes.func
    }

    render() {
        return (
            <div>
                <pre>{this.props.message}</pre>
                <div>
                    <button onClick={this.props.add}>Change Message</button>
                </div>
            </div>
        );
    }

}
