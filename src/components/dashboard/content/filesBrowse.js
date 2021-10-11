import * as React from "react";
import logo from "../../../logo.svg";
import {Get} from "../utils/apiRequests";
import {useEffect} from "react";
import {Table} from "react-bootstrap";

export default function FilesBrowse() {
    const [files, setFiles] = React.useState(null)

    useEffect(() => Get("/api/file/", (items) => setFiles(items)))

    if (files?.length > 0) {
        return (
            <Table style={{textAlign: "left"}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <td>Name</td>
                    <td>Portfolio ID</td>
                    <td>Portfolio Title</td>
                </tr>
                </thead>
                <tbody>
                {
                    files.map(file =>
                        <tr>
                            <td>{file._id}</td>
                            <td>{file.name}</td>
                            <td>{file.Portfolio._id}</td>
                            <td>{file.Portfolio.title}</td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        )
    } else if (files) {
        return (
            <div className="d-flex justify-content-center">
                <img src={logo} className="App-logo" alt={"loading"}/>
                <div>No files found</div>
            </div>
        )
    } else {
        return (
            <div className="d-flex justify-content-center">
                <img src={logo} className="App-logo" alt={"loading"}/>
            </div>
        )
    }
}