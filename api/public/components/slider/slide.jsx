class Slide extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            slide: props.slide
        };
    }

    render() {
        if (this.state.error) return this.renderError(); // Если ошибка - вывожу ее
        return this.renderData();
    }
    

    // Вывод основного состояния компонента
    renderData() {
        return (
            <div className={"carousel-item w-100" + (this.props.active? " active": "")}>
                <img src={this.state.slide.imageSrc} alt=":(" className={"w-100 h-100"}/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>{this.state.slide.title}</h5>
                    <p>{this.state.slide.text}</p>
                </div>
            </div>
        );
    }

    // Отображение компонента в состоянии ошибки
    renderError() {
        return (
            <div className="alert alert-danger" role="alert">
                Error: {this.state.error.message}
            </div>
        );
    }

}