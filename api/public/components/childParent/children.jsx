class Children extends React.Component {

    constructor(props) {
        super(props);
        console.log("Children - constructor")
        this.state = {
            isLoaded: false,
            error: null,
            items: []
        };
    }

    componentDidMount() {
        console.log("Children - componentDidMount")
    }
    componentWillUnmount() {
        console.log("Children - componentWillUnmount")
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Children - componentDidUpdate")
    }

    toggleShowChildren() {
        this.props.actionChange();
    }

    render(){
        console.log("Children - render")

        return (
            <div>
                <h1> Children: {this.props.someVar} </h1>
                <button onClick={this.toggleShowChildren.bind(this)}>Hide</button>
            </div>
        )
    }

    // Вывод основного состояния компонента
    renderData(){
        let key = 1;
        return (
            <div>

            </div>
        );
    }

    // Компонент в состоянии загрузки
    renderLoading(){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    // Отображение компонента в состоянии ошибки
    renderError(){
        return (
            <div className="alert alert-danger" role="alert">
                Error: {this.state.error.message}
            </div>
        );
    }


}