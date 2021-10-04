class Reactive extends React.Component {
    constructor(props) {
        super(props);
        console.log("Constructing component");
        this.state = {
            items:[]
        }
    }
    
    add()
    {
        this.state.items.push("new element")
        this.setState({})
    }
    
    render() {
        console.log("Drawing component");
        let key = 1;
        return (
            <div>
                <CheckInput/>
                <Counter startCount={5}/>
                <ul>
                    {
                        this.state.items.map(item =>
                        <li key = {key++}> {item} </li>
                        )
                    }
                </ul>
                <button onClick={this.add.bind(this)}>Add</button>
            </div>
        )
    }
}