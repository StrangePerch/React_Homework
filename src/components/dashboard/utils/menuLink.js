import React from "react";
import {
    Link,
    useRouteMatch
} from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";


export default function MenuLink({icon, label, to}) {
    let match = useRouteMatch({
        path: to,
        exact: true
    });
    let text, color;
    if(match)
    {
        text = ">" + label;
        color = "blue";
    }
    else
    {
        text = label;
        color = "black";
    }
    return (
        <div>
            <Link to={to} style={{ textDecoration: 'none',  color: color}}>
                <ListItem button>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItem>
            </Link>
        </div>
    );
}