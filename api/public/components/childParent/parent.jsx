class Parent extends React.Component {

    constructor(props) {
        super(props);
        console.log("Parent - constructor")
        this.state = {
            isShowChildren: false,
            isLoaded: false,
            error: null,
            items: []
        };
    }

    componentDidMount() {
        console.log("Parent - componentDidMount")
    }

    componentWillUnmount() {
        console.log("Parent - componentWillUnmount")
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Parent - componentDidUpdate")
    }

    toggleShowChildren() {
        this.setState({isShowChildren: !this.state.isShowChildren});
    }

    render() {
        console.log("Parent - render")
    
        return (
            <div>
                <h1>Parent</h1>
                <div className="form-check form-switch">
                    <input onChange={this.toggleShowChildren.bind(this)} checked={this.state.isShowChildren}
                           className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show children
                        input</label>
                </div>
                {this.state.isShowChildren &&
                <Children actionChange={this.toggleShowChildren.bind(this)}
                          someVar={"Children Name"}/>}
            </div>
        )
    }

    // Вывод основного состояния компонента
    renderData() {
        let key = 1;
        return (
            <div>

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