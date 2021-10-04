class Counter extends React.Component {
    constructor(props) {
        super(props);
        console.log("Constructing component");
        this.state = {
            counter: this.props.startCount
        }
    }

    count()
    {
        this.setState({counter: ++this.state.counter})
    }

    render() {
       return(
           <div>
               <p> You clicked {this.state.counter} times</p>
               <button onClick={this.count.bind(this)}>Click me</button>
           </div>
       )
    }
}