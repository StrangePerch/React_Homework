import React from 'react';
import {Badge} from "react-bootstrap";
import {Tooltip, Zoom} from "@mui/material";
import {Delete, Post} from "../../../utils/apiRequests";

function DeletableTagBadge({tag, portfolioId, removed}) {
    const [isHovered, setHover] = React.useState(false);
    const handleRemove = () => {
        RemoveTagFromPortfolio(tag._id, portfolioId, removed)
    }
    if (isHovered) {
        return (
            <Tooltip
                title="Click to delete"
                placement="top" arrow TransitionComponent={Zoom}
            >
                <a href="#" onClick={handleRemove}>
                    <Badge onMouseOut={() => setHover(false)}
                           className={"p-1 m-1"} bg="danger">
                        {tag.name}
                    </Badge>
                </a>
            </Tooltip>
        );
    } else {
        return (
            <Badge onMouseOver={() => setHover(true)}
                   className={"p-1 m-1"} bg="primary"
                   key={tag._id}>{tag.name}</Badge>
        );
    }
}

function RemoveTagFromPortfolio(tagId, portfolioId, callback) {
    Delete("/api/tag/" + tagId + "/", portfolioId, (res) => callback(tagId))
}

export default DeletableTagBadge;