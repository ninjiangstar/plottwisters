import * as React from "react";
import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from "react-router-dom";
import { CookieTrail } from "./containers/CookieTrail";

namespace ProfileApp {
    export interface IOwnProps extends RouteComponentProps {
    }

    export type IProps = IOwnProps;
}

export const ProfileApp = (props: ProfileApp.IProps) => {
    return (
        <Router basename={props.match.path}>
            <Switch>
                <Route exact={true} path="/" component={CookieTrail} />
            </Switch>
        </Router>
    );
};
