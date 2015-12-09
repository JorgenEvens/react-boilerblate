'use strict';

import App from 'components/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import reducers from 'reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const pages = require.context( './pages', true, /index\.js$/ );
const store = createStore(reducers);

if( __DEV__ ) {
    module.hot && module.hot.accept('reducers', () => {
        const nextReducer = require('reducers').default;
        store.replaceReducer(nextReducer);
    });
}

ReactDOM.render(
    <Provider store={store} >
        <Router>
            <Route path="/" component={App}>
                {pages.keys().map(pages).map(k => k.routes)}
            </Route>
        </Router>
    </Provider>
, document.getElementById('app'));

