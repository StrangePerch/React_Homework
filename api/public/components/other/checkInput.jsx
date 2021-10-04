class CheckInput extends React.Component {
    constructor(props) {
        super(props);
        console.log("Constructing component");
        this.state = {
            userText: "",
            isCanSend: false
        }
    }

    change(element)
    {
        let value = element.target.value;
        this.state[element.target.name] = value;    
        this.isCanSend = value !== "";
        this.setState({})
    }

    render() {
        return(
            <div>
                <input onInput={this.change.bind(this)} type="text" name="userText" value={this.userText}/>
                <div>{this.state.userText}</div>
                <input type="button" disabled={!this.isCanSend} value="Send"/>
            </div>
        )
    }
}