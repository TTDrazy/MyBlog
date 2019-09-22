import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import AdminStore from "./stores/AdminStore";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import ArticleList from "./pages/manage/article/ArticleList";
import ShowArticle from "./pages/manage/article/ShowArticle";
import EditArticle from "./pages/manage/article/EditArticle";
import AddArticle from "./pages/manage/article/AddArticle";
import ClassifyList from "./pages/manage/classify/ClassifyList";
import EditClassify from "./pages/manage/classify/EditClassify";
import AddClassfiy from "./pages/manage/classify/AddClassfiy";
import Index from "./pages/manage/Inedx";
import CodeArticle from "./pages/main/article/CodeArticle";
import ClassifyArticle from "./pages/main/article/ClassifyArticle";
import ReadArticle from "./pages/main/article/ReadArticle";
import Introduction from "./pages/main/introduction/Introducetion";

let adminStore = new AdminStore();

ReactDOM.render(
    <Provider adminStore={adminStore}>
        <Router>
            <Route path="/" exact component={Main} />
            <Route path="/introduction" exact component={Introduction} />
            <Route path="/codeArticle" exact component={CodeArticle} />
            <Route path="/readArticle" exact component={ReadArticle} />
            <Route path="/classifyArticles" exact component={ClassifyArticle} />
            <Route path="/login" exact component={Login} />
            <Route path="/manage" exact component={Index} />
            <Route path="/article/list" exact component={ArticleList} />
            <Route path="/article/show" exact component={ShowArticle} />
            <Route path="/article/edit" exact component={EditArticle} />
            <Route path="/article/add" exact component={AddArticle} />
            <Route path="/classify/list" exact component={ClassifyList} />
            <Route path="/classify/show" exact component={ShowArticle} />
            <Route path="/classify/edit" exact component={EditClassify} />
            <Route path="/classify/add" exact component={AddClassfiy} />
        </Router>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
