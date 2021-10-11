import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Badge, Button} from "react-bootstrap";
import EditIcon from '@mui/icons-material/Edit';
import {useEffect} from "react";
import {Post, PostFile} from "../../../utils/apiRequests";
import DeletableFileBadge from "./DeletableFileBadge";
import CheckIcon from "@mui/icons-material/Check";
import _ from "lodash";

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

export default function FilesModal({portfolio, initialEdit}) {
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(initialEdit);
    const [files, setFiles] = React.useState(portfolio.files ?? []);
    let fileInput = React.createRef();
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
        addFilesToPortfolio(fileInput.current.files, portfolio._id, (newFiles) => {
            setFiles(oldFiles => [...oldFiles, newFiles]);
        }
    )
    }
    const handleRemove = (removed) => {
        setFiles(files.filter((file) => file._id !== removed))
    }
    if (edit) {
        return (<div key={"filesModal"}>
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
                            style={{fill: "white"}}/></Button>Files
                    </Typography>
                    <div className="container-fluid p-0 my-3">
                        {files.map(file =>
                            <DeletableFileBadge key={file._id} file={file}
                                                portfolioId={portfolio._id}
                                                removed={handleRemove}/>
                            )}
                    </div>
                    <form action={"api/file"} encType="multipart/form-data">
                        <div className="d-flex flex-row">
                            <input className="form-control" type="file" id="formFileMultiple"
                                   multiple ref={fileInput}/>
                            <Button variant="success" onClick={handleAdd}>
                                <CheckIcon style={{fill: "white"}}/>
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>);
    } else {
        return (<div key={"filesModal"}>
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
                            style={{fill: "white"}}/></Button>Files
                    </Typography>
                    <div className="container-fluid p-0 my-3">
                        {files.map(file => <Badge className={"p-1 m-1"} bg="primary"
                                                 key={file._id}>
                            <a style={{textDecoration: "none", color: "white"}} target={"_blank"}
                                href={"http://localhost:3001" + file.path}>{file.name}</a>
                        </Badge>)}
                    </div>
                </Box>
            </Modal>
        </div>);
    }
}

function addFilesToPortfolio(files, portfolioId, callback) {
    for (const file of files) {
        let formData = new FormData();
        formData.append("fileData", file);
        PostFile("/api/file/" + portfolioId, formData, 
            (newFile) => callback(_.omit(newFile, ["Portfolio", "__v"])))
    }
}