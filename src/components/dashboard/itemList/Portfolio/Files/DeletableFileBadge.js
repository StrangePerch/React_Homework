import React from 'react';
import {Badge} from "react-bootstrap";
import {Tooltip, Zoom} from "@mui/material";
import {Delete, Post} from "../../../utils/apiRequests";

function DeletableFileBadge({file, portfolioId, removed}) {
    const [isHovered, setHover] = React.useState(false);
    const handleRemove = () => {
        RemoveTagFromPortfolio(file._id, portfolioId, removed)
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
                        {file.name}
                    </Badge>
                </a>
            </Tooltip>
        );
    } else {
        return (
            <Badge onMouseOver={() => setHover(true)}
                   className={"p-1 m-1"} bg="primary"
                   key={file._id}>{file.name}</Badge>
        );
    }
}

function RemoveTagFromPortfolio(fileId, portfolioId, callback) {
    Delete("/api/file/" + fileId + "/", portfolioId, (res) => callback(fileId))
}

export default DeletableFileBadge;