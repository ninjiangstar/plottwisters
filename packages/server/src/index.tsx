import { ProfileApp } from "@twisterland/profile-app";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route, RouteComponentProps, RouteProps, Switch } from "react-router-dom";
import "./index.scss";

const renderMain = () => {
    return <Redirect to="/profile" />;
};

const renderProfile = (routeProps: RouteComponentProps) => {
    return <ProfileApp {...routeProps} />;
};

const TwisterlandRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact={true} path="/" render={renderMain} />
                <Route path="/profile" render={renderProfile} />
            </Switch>
        </Router>
    );
};

const root = document.querySelector("#twisterland-root");
ReactDOM.render(<TwisterlandRouter />, root);
