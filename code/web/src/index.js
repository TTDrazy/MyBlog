import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import AdminStore from "./stores/AdminStore";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Manage from "./pages/manage/Manage";
import List from "./pages/manage/article/List";
import ShowArticle from "./pages/manage/article/ShowArticle";
import EditArticle from "./pages/manage/article/EditArticle";

let adminStore = new AdminStore();

ReactDOM.render(
    <Provider adminStore={adminStore}>
        <Router>
            <Route path="/" exact component={Main} />
            <Route path="/login" exact component={Login} />
            <Route path="/manage" exact component={Manage} />
            <Route path="/article/list" exact component={List} />
            <Route path="/article/show" exact component={ShowArticle} />
            <Route path="/article/edit" exact component={EditArticle} />
            <Route path="/article/manage" exact component={Manage} />
            <Route path="/classify/list" exact component={Manage} />
            <Route path="/classify/manage" exact component={Manage} />
        </Router>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
