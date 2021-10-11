import * as React from "react";
import logo from "../../../logo.svg";
import {Get} from "../utils/apiRequests";
import {useEffect} from "react";
import {Table} from "react-bootstrap";

export default function TagsBrowse() {
    const [tags, setTags] = React.useState(null)

    useEffect(() => Get("/api/tag/", (items) => setTags(items)))

    if (tags?.length > 0) {
        return (
            <Table style={{textAlign: "left"}}>
                <thead>
                <tr>
                    <th>ID</th>
                    <td>Name</td>
                    <td>Used</td>
                </tr>
                </thead>
                <tbody>
                {
                    tags.map(tag =>
                        <tr>
                            <td>{tag._id}</td>
                            <td>{tag.name}</td>
                            <td>{tag.portfolios.length}</td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        )
    } else if (tags) {
        return (
            <div className="d-flex justify-content-center">
                <img src={logo} className="App-logo" alt={"loading"}/>
                <div>No tags found</div>
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