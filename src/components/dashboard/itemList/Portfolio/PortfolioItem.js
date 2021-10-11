import React from "react";
import {Button, FormControl} from "react-bootstrap";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {Delete, Put} from "../../utils/apiRequests";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TagsModal from "./Tags/TagsModal";
import FilesModal from "./Files/FilesModal";

export default class PortfolioItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            item: props.item,
            updatedItem: props.item,
            api: props.api,
            updated: props.updated,
            deleted: props.deleted,
            edit: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.deletePortfolio = this.deletePortfolio.bind(this);
        this.putPortfolio = this.putPortfolio.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    handleChange(event) {
        this.setState(prevState => ({
            updatedItem: {                   // object that we want to update
                ...prevState.updatedItem,    // keep all other key-value pairs
                [event.target.name]: event.target.value       // update the value of specific key
            }
        }))
    }
    
    cancelEdit()
    {
        this.setState({edit: false, updatedItem: this.state.item})
    }

    putPortfolio() {
        Put(this.state.api, this.state.updatedItem, (item) => this.state.updated(item));
        this.setState({edit: false, item: this.state.updatedItem})
    }

    deletePortfolio() {
        Delete(this.state.api, this.state.item._id, () => this.state.deleted(this.state.item));
    }
    
    render() {
        if(this.state.edit) return this.renderEdit()
        return this.renderData();
    }

    renderData(){
        let item = this.state.item;
        return (
            <tr>
                <td>{item._id}</td>
                <td>{item.title}</td>
                <td><FormControl readOnly={true} name={"text"} value={item.text}/></td>
                <td><FilesModal portfolio={item} initialEdit={false}/></td>
                <td><TagsModal portfolio={item} initialEdit={false}/></td>
                <td><Button onClick={() => this.setState({edit: true})} variant="warning"><EditIcon style={{fill: "white"}}/></Button></td>
                <td><Button onClick={this.deletePortfolio} variant="danger"><DeleteForeverIcon/></Button></td>
            </tr>
        )
    }

    renderEdit(){
        let item = this.state.updatedItem;
        return (
            <tr>
                <td>{item._id}</td>
                <td><FormControl name={"title"} value={item.title} onChange={this.handleChange}/></td>
                <td><FormControl name={"text"} value={item.text} onChange={this.handleChange}/></td>
                <td><FilesModal portfolio={item} initialEdit={true}/></td>
                <td><TagsModal portfolio={item} initialEdit={true}/></td>
                <td><Button variant="success" onClick={this.putPortfolio}><CheckIcon style={{fill: "white"}}/></Button></td>
                <td><Button variant="warning" onClick={this.cancelEdit} ><ClearIcon style={{fill: "white"}}/></Button></td>
                <td><Button variant="danger"><DeleteForeverIcon/></Button></td>
            </tr>
        )
    }
}

