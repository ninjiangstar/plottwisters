import { GiftTaggerApp } from "@twisterland/gift-tagger-app";
import { ProfileApp } from "@twisterland/profile-app";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import "./index.scss";

const renderMain = () => {
    return <Redirect to="/profile" />;
};

const renderProfile = (routeProps: RouteComponentProps) => {
    return <ProfileApp {...routeProps} />;
};

const renderGiftTagger = (routeProps: RouteComponentProps) => {
    return <GiftTaggerApp />;
};

const TwisterlandRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact={true} path="/" render={renderMain} />
                <Route path="/profile" render={renderProfile} />
                <Route path="/gift-tagger" render={renderGiftTagger} />
            </Switch>
        </Router>
    );
};

const root = document.querySelector("#twisterland-root");
ReactDOM.render(<TwisterlandRouter />, root);
