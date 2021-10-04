import {Redirect, Route, Switch} from "react-router-dom";
import DefaultContent from "../content/defaultContent";
import * as React from "react";
import SliderBrowse from "../content/sliderBrowse";
import SliderEdit from "../content/sliderEdit";

export default function AppRoutes() {
    return (
        <Switch>
            <Route path={"/slider/edit"}> <SliderEdit/> </Route>
            <Route path={"/slider/browse"}> <SliderBrowse/> </Route>
            <Route path={"/slider"}> <Redirect
                to={{
                    pathname: "/slider/browse"
                }}
            /> </Route>
            <Route path={"/"}> <DefaultContent/> </Route>
        </Switch>
    )
}
