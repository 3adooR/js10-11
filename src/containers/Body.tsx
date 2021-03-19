import {Route, Switch} from "react-router-dom";
import React from "react";
import {Cities} from "../components/Cities";
import {Weather} from "../components/Weather";

export const Body = () => (<>
    <div style={{margin: "1em 2em"}}>
        <Switch>
            <Route path="/cities">
                <Cities/>
            </Route>
            <Route path="/" exact>
                <Weather/>
            </Route>
            <Route>
                <h1>ERROR 404</h1>
                <p>Page not found.</p>
            </Route>
        </Switch>
    </div>
</>);