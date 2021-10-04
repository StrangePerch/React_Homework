class Slider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            slides: [],
            newSlide: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.postSlide = this.postSlide.bind(this);
    }
    
    handleChange(event) {
        this.state.newSlide[event.target.name] = event.target.value;
        this.setState({});
    }

    componentDidMount() {
        console.log("Fetch slides");
        fetch("api/slides")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    slides: data
                });
                console.log(data);
                console.log("Success");
            }).catch(err => console.log(err))
    }

    postSlide(event) {
        fetch("api/slides",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.state.newSlide)
            })
            .then(response => response.json())
            .then(data => {
                this.state.newSlide._id = data._id;
                this.setState({
                    slides: this.state.slides.concat(this.state.newSlide)
                })
            }).catch(err => console.log(err))
        event.preventDefault();
    }

    render() {
        if (this.state.error) return this.renderError(); // Если ошибка - вывожу ее
        if (!this.state.isLoaded) return this.renderLoading(); // Загружаюсь
        return this.renderData();
    }

    // Вывод основного состояния компонента
    renderData() {
        // noinspection HtmlUnknownAnchorTarget
        let indicatorsIndex = 0;
        return (
            <div>
                <div id="carousel" className="carousel slide w-50" data-bs-ride="carousel">
                    <ol className="carousel-indicators">
                        {
                            this.state.slides.map((slide, index) =>
                                <li key={"Indicator-" + indicatorsIndex} data-bs-target="#carousel"
                                    data-bs-slide-to={indicatorsIndex++} className={(index === 0?"active":"")}/>
                            )
                        }
                    </ol>
                    <div className="carousel-inner">
                        {
                            this.state.slides.map((slide, index) =>
                                <Slide key={slide._id} slide={slide} active={index === 0}/>
                            )
                        }
                    </div>
                    <a className="carousel-control-prev" data-bs-target="#carousel" role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"/>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" data-bs-target="#carousel" role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"/>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <div className="card row" key="CreateNewSlide">
                    <div className="card-body">
                        <input className={"input-group"} name={"title"} placeholder={"Title"}
                               onChange={this.handleChange}/>
                        <input className={"input-group"} name={"text"} placeholder={"Text"}
                               onChange={this.handleChange}/>
                        <input className={"input-group"} name={"imageSrc"} placeholder={"ImgSrc"}
                               onChange={this.handleChange}/>
                        <input type={"button"} className="btn btn-primary" value="Post" onClick={this.postSlide}/>
                    </div>
                </div>
            </div>

        );
    }

    // Компонент в состоянии загрузки
    renderLoading() {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
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