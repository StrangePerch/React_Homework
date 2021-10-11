import {Redirect, Route, Switch} from "react-router-dom";
import DefaultContent from "../content/defaultContent";
import * as React from "react";
import SliderBrowse from "../content/sliderBrowse";
import SliderEdit from "../content/sliderEdit";
import PortfolioEdit from "../content/portfolioEdit";
import TagsBrowse from "../content/tagsBrowse";
import FilesBrowse from "../content/filesBrowse";

export default function AppRoutes() {
    return (
        <Switch>
            <Route path={"/portfolio/edit"}> <PortfolioEdit/> </Route>
            <Route path={"/slider/edit"}> <SliderEdit/> </Route>
            <Route path={"/slider/browse"}> <SliderBrowse/> </Route>
            <Route path={"/tags/browse"}> <TagsBrowse/> </Route>
            <Route path={"/files/browse"}> <FilesBrowse/> </Route>
            <Route path={"/slider"}> <Redirect
                to={{
                    pathname: "/slider/browse"
                }}
            /> </Route>
            <Route path={"/tags"}> <Redirect
                to={{
                    pathname: "/tags/browse"
                }}
            /> </Route>
            <Route path={"/files"}> <Redirect
                to={{
                    pathname: "/files/browse"
                }}
            /> </Route>
            <Route path={"/"}> <DefaultContent/> </Route>
        </Switch>
    )
}
