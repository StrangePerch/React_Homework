class EntityList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            items: []
        };
    }

    onChange(element) {
        this.state[element.target.name] = element.target.value;
    }
    
    actionUpdate(req)
    {
        if(req.action === "POST") {
            console.log("Update POST")
            this.setState({
                items: this.state.items.concat(req.item)
            })
        }
        else if(req.action === "DELETE")
        {
            console.log("Update DELETE")
            console.log(this.state.items)
            this.setState({items: this.state.items.filter(function(items) {
                    return items !== req.item
                })});
        }
        else
        {
            throw "Unknown action in action Update";
        }
    }

    componentDidMount() {
        console.log("Fetch entities");
        fetch("api/entities")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    items: data
                });
                console.log(data);
                console.log("Success");
            }).catch(err => console.log(err))
    }

    render() {
        if (this.state.error) return this.renderError(); // Если ошибка - вывожу ее
        if (!this.state.isLoaded) return this.renderLoading(); // Загружаюсь
        return this.renderData();
    }

    // Вывод основного состояния компонента
    renderData() {
        console.log("Render Data")  
        console.log(this.state.items)
        return (
            <div className="container">
                {
                    this.state.items.map(item => <EntityItem actionUpdate={this.actionUpdate.bind(this)} key={item._id} entity={item}/>)
                }
                <EntityItem actionUpdate={this.actionUpdate.bind(this)} key={"newElement"} entity={null}/>
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