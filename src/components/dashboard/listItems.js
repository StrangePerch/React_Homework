import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import TuneIcon from '@mui/icons-material/Tune';
import HomeIcon from '@mui/icons-material/Home';
import MenuLink from "./utils/menuLink";

export const mainListItems = (
    <div>
        <MenuLink to={"/"} label={"Home"} icon={<HomeIcon/>}/>
        <MenuLink to={"/slider/browse"} label={"Slider"} icon={<SlideshowIcon/>}/>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Api</ListSubheader>
        <MenuLink to={"/slider/edit"} label={"Slider"} icon={<TuneIcon/>}/>
    </div>
);
