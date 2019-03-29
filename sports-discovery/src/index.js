import './index.css';

import * as serviceWorker from './serviceWorker';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AboutPage from './pages/about';
import HomePage from './pages/home';
import Layout from './layout';
import NotFoundPage from './pages/not-found';
import React from 'react';
import ReactDOM from 'react-dom';

const routing = (
    <Router>
        <Layout>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </Layout>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
