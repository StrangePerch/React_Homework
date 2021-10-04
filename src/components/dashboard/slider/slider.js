import React from 'react';
import logo from '../../../logo.svg';
import {Carousel} from 'react-bootstrap'
import SlideForm from "../itemList/SlideForm";
import {Get} from "../utils/apiRequests";

export default class Slider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            slides: []
        };
    }
    
    componentDidMount() {
        Get("/api/slides", (data) => this.setState({slides: data, isLoaded: true}))
    }
    
    render() {
        if (this.state.error) return this.renderError();
        if (!this.state.isLoaded) return this.renderLoading();
        return this.renderData();
    }

    renderData() {
        return (
            <div>
                <Carousel>
                    {this.state.slides.map((slide) =>
                        <Carousel.Item key={slide._id}>
                            <img
                                className="d-block w-100"
                                src={slide.imageSrc}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>{slide.title}</h3>
                                <p>{slide.text}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}
                </Carousel>
                <SlideForm/>
            </div>

        );
    }

    renderLoading() {
        return (
            <div className="d-flex justify-content-center">
                <img src={logo} className="App-logo" alt={"loading"}/>
            </div>
        )
    }

    renderError() {
        return (
            <div className="alert alert-danger" role="alert">
                Error: {this.state.error.message}
            </div>
        );
    }

}