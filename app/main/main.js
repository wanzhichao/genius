import React from 'react';
import { render } from 'react-dom';
import {Router, Route, IndexRoute, Link, hashHistory,browserHistory} from 'react-router'
import { createHistory } from 'history'

import Firstpage from "../view/Firstpage"
import Detail from "../view/Detail"
import Result from "../view/Result"
import FinancialAdvisor  from "../view/FinancialAdvisor"
import MySubscribe  from "../view/MySubscribe"
import '../../css/reset.scss';
import '../../css/style.scss';
window.data = {};
//配置页面的Router，并指定首页
render((
    <Router history={hashHistory}>
        <Route path="/" >
            <IndexRoute component={Firstpage}/>
            <Route path="/firstpage"  component={Firstpage}/>
            <Route path="/detail"  component={Detail}/>
            <Route path="/result" component={Result}/>
            <Route path="/financialAdvisor" component={FinancialAdvisor}/>
            <Route path="/mySubscribe" component={MySubscribe}/>
        </Route>
    </Router>
), document.getElementById("react-cont"));
