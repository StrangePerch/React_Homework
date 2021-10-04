import React from "react";
import {Button, FormControl} from "react-bootstrap";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {Delete, Put} from "../utils/apiRequests";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export default class SlideItem extends React.Component {
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
        this.deleteSlide = this.deleteSlide.bind(this);
        this.putSlide = this.putSlide.bind(this);
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

    putSlide() {
        Put(this.state.api, this.state.updatedItem, (item) => this.state.updated(item));
        this.setState({edit: false, item: this.state.updatedItem})
    }

    deleteSlide() {
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
                <td><FormControl readOnly={true} value={item.imageSrc}/></td>
                <td>{item.title}</td>
                <td>{item.text}</td>
                <td><Button onClick={() => this.setState({edit: true})} variant="warning"><EditIcon style={{fill: "white"}}/></Button></td>
                <td><Button onClick={this.deleteSlide} variant="danger"><DeleteForeverIcon/></Button></td>
            </tr>
        )
    }

    renderEdit(){
        let item = this.state.updatedItem;
        return (
            <tr>
                <td>{item._id}</td>
                <td><FormControl name={"imageSrc"} value={item.imageSrc} onChange={this.handleChange}/></td>
                <td><FormControl name={"title"} value={item.title} onChange={this.handleChange}/></td>
                <td><FormControl name={"text"} value={item.text} onChange={this.handleChange}/></td>
                <td><Button variant="success" onClick={this.putSlide}><CheckIcon style={{fill: "white"}}/></Button></td>
                <td><Button variant="warning" onClick={this.cancelEdit} ><ClearIcon style={{fill: "white"}}/></Button></td>
                <td><Button variant="danger"><DeleteForeverIcon/></Button></td>
            </tr>
        )
    }
}

