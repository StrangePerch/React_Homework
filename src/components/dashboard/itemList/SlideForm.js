import React from "react";
import {Post} from "../utils/apiRequests";

export default class SlideForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            newSlide: {},
            api: props.api,
            posted: props.posted
        };
        this.handleChange = this.handleChange.bind(this)
        this.postSlide = this.postSlide.bind(this)
    }

    handleChange(event) {
        this.setState(prevState => ({
            newSlide: {                   // object that we want to update
                ...prevState.newSlide,    // keep all other key-value pairs
                [event.target.name]: event.target.value       // update the value of specific key
            }
        }))
    }

    postSlide() {
        Post(this.state.api, this.state.newSlide, (item) => this.state.posted(item))
    }

    render() {
        return (
            <div className="d-flex flex-row justify-content-center" key="CreateNewSlide">
                <div className="w-50">
                    <input className={"input-group"} name={"title"} placeholder={"Title"}
                           onChange={this.handleChange}/>
                    <input className={"input-group"} name={"text"} placeholder={"Text"}
                           onChange={this.handleChange}/>
                    <input className={"input-group"} name={"imageSrc"} placeholder={"ImgSrc"}
                           onChange={this.handleChange}/>
                    <input type={"button"} className="btn btn-primary w-100" value="Post" onClick={this.postSlide}/>
                </div>
            </div>);
    }
}