class EntityItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            isForm: this.props.entity == null,
            isEdit: false,
            error: null,
            item: props.entity,
        };
        this.handleChange = this.handleChange.bind(this);
        this.postEntity = this.postEntity.bind(this);
        this.deleteEntity = this.deleteEntity.bind(this);
        this.showEdit = this.showEdit.bind(this);
    }
    
    updateList(item)
    {
        this.props.actionUpdate(item)
    }

    onChange(element) {
        this.state[element.target.name] = element.target.value;
    }

    showEdit() {
        this.setState({isEdit: true});
    };

    hideEdit() {
        this.setState({isEdit: false});
    };

    handleChange(event) {
        this.setState({item: {[event.target.name]: event.target.value}});
    }
    
    postEntity(event) {
        fetch("api/entities",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.state.item)
            })
            .then(response => response.json())
            .then(data => {
                this.setState({isEdit: false});
                this.state.item._id = data._id;
                this.updateList({action: "POST", item: this.state.item})
            }).catch(err => console.log(err))
        event.preventDefault();
    }

    deleteEntity(event) {
        fetch("api/entities/" + this.state.item._id,
            {
                method: "DELETE",
            })
            .then(response => {
                if (response.status === 200) {
                    this.updateList({action: "DELETE", item: this.state.item})
                }
            }).catch(
                err =>
                {
                    console.log("Error while fetching in deleteEntity")
                    console.log("Error: " + err)
                    console.log("Item:")
                    console.log(this.state.item)
                })
        event.preventDefault();
    }

    render() {
        if (this.state.error) return this.renderError(); // Если ошибка - вывожу ее
        if (!this.state.isLoaded) return this.renderLoading(); // Загружаюсь
        if (!this.state.isForm) return this.renderData();
        if (this.state.isEdit) return this.renderForm();
        return this.renderButton();
    }

    renderForm() {
        return (
            <div className="card row" key="CreateNewElement">
                <div className="card-body">
                    <input className={"input-group"} name={"name"} placeholder={"Name"} onChange={this.handleChange}/>
                    <input type={"button"} className="btn btn-primary" value="Post" onClick={this.postEntity}/>
                    <input type={"button"} className="btn btn-primary" value="Cancel" onClick={this.hideEdit}/>
                </div>
            </div>
        );
    }

    // Предложить созать форму
    renderButton() {
        return (
            <div className="card row" key="CreateNewElement">
                <div className="card-body">
                    <input key={"createButton"} type={"button"} className="btn btn-primary" value={"Create"} onClick={this.showEdit}/>
                </div>
            </div>
        );
    }

    // Вывод основного состояния компонента
    renderData() {
        return (
            <div className="card row" key={this.state.item._id}>
                <div className="card-body">
                    {this.state.item.name}
                    <input type={"button"} className="btn btn-danger" value="Delete" onClick={this.deleteEntity}/>
                </div>
            </div>
        );
    }


    // Компонент в состоянии загрузки
    renderLoading() {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...........................................................</span>
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