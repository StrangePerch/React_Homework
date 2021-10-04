class ApiPrivatExchange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
            .then(response => {return response.json()})
            .then(data => {
                this.setState(
                    {
                        isLoaded:true,
                        items: data
                    }
                )
            })
            .catch(err => this.setState({error: err}))
    }

    render(){
        console.log("Render");
        if(this.state.error) return this.renderError(); // Если ошибка - вывожу ее
        if(!this.state.isLoaded) return this.renderLoading(); // Загружаюсь
        return this.renderData();
    }
    // Вывод основного состояния компонента
    renderData(){
        let key = 1;
        return (
            <table>
                <tbody>
                {
                    this.state.items.map(
                        row =>(
                            <tr key={key++}>
                                <td>
                                    {row.ccy}
                                </td>
                                <td>
                                    {row.base_ccy}
                                </td>
                                <td>
                                    {row.buy}
                                </td>
                                <td>
                                    {row.sale}
                                </td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
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