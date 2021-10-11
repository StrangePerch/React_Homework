import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Badge, Button, FormControl} from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import {useEffect} from "react";
import AddIcon from '@mui/icons-material/Add';
import {Post} from "../../../utils/apiRequests";
import DeletableTagBadge from "./DeletableTagBadge";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TagsModal({portfolio, initialEdit}) {
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(initialEdit);
    const [value, setValue] = React.useState('');
    const [tags, setTags] = React.useState(portfolio.tags);
    const handleChange = (e) => setValue(e.target.value);
    useEffect(() => {
        setEdit(initialEdit)
    }, [initialEdit]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEdit(initialEdit)
    };
    const handleToEdit = () => setEdit(true);
    const handleToView = () => setEdit(false);
    const handleAdd = () => {
        addTagToPortfolio(value, portfolio._id, (item) => 
            setTags(tags.concat(item)))
    }
    const handleRemove = (removed) => {
        setTags(tags.filter((tag) => tag._id !== removed))
    }
    if (edit) {
        return (<div key={"tagsModal"}>
            <Button onClick={handleOpen} variant="warning"><EditIcon style={{fill: "white"}}/></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Button onClick={handleToView} variant="warning" className={"p-1 me-2"}><EditIcon
                            style={{fill: "white"}}/></Button>Tags
                    </Typography>
                    <div className="container-fluid p-0 my-3">
                        {tags.map(tag =>
                            <DeletableTagBadge key={tag._id} tag={tag}
                                               portfolioId={portfolio._id}
                                               removed={handleRemove}/>)}
                    </div>
                    <div className="d-flex flex-row">
                        <FormControl onChange={handleChange} name={"title"}/>
                        <Button onClick={handleAdd} variant="success"><AddIcon
                            style={{fill: "white"}}/></Button>
                    </div>
                </Box>
            </Modal>
        </div>);
    } else {
        return (<div key={"tagsModal"}>
            <Button onClick={handleOpen} variant="primary"><VisibilityIcon style={{fill: "white"}}/></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <Button onClick={handleToEdit} variant="primary" className={"p-1 me-2"}><VisibilityIcon
                            style={{fill: "white"}}/></Button>Tags
                    </Typography>
                    <div className="container-fluid p-0 my-3">
                        {tags.map(tag => <Badge className={"p-1 m-1"} bg="primary"
                                                key={tag._id}>{tag.name}</Badge>)}
                    </div>
                </Box>
            </Modal>
        </div>);
    }
}

function addTagToPortfolio(tag, portfolioId, callback) {
    Post("/api/tag", {name: tag, portfolioId: portfolioId}, callback)
}
