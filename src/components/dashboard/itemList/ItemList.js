import React from "react";
import {Get} from "../utils/apiRequests"
import logo from "../../../logo.svg";
import {Table} from "react-bootstrap";
import _ from "lodash";

export default class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            api: props.api,
            ignore: props.ignore,
            items: [],
            item: props.item,
            form: props.form
        };
    }

    render() {
        if (!this.state.isLoaded) return this.renderLoading();
        if(this.state.items.length === 0) return this.renderEmpty();
        return this.renderData();
    }

    renderLoading() {
        return (
            <div className="d-flex justify-content-center">
                <img src={logo} className="App-logo" alt={"loading"}/>
            </div>
        )
    }

    onPost(data) {
        this.setState({
            items: this.state.items.concat(data)
        })
    }

    onPut(data) {
        const newItems = _.clone(this.state.items) //copy the array
        const index = _.findIndex(newItems, (item) => item._id === data._id);
        newItems[index] = data;
        this.setState({items: newItems}) //set the new state
    }

    onDelete(data) {
        console.log (data)
        this.setState({
            items: this.state.items.filter(function (item) {
                return item._id !== data._id
            })
        });
    }

    renderData() {
        let columns = Object.keys(this.state.items[0]).filter(i => i !== this.state.ignore);
        let rows = this.state.items.map(i => _.omit(i, this.state.ignore));
        return (
            <div>
                <Table style={{textAlign: "left"}}>
                    <thead>
                    <tr>
                        {
                            columns.map(column => <th key={column}>{column}</th>)
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        rows.map(row => <this.state.item key={row._id} item={row} api={this.state.api}
                                                         updated={this.onPut.bind(this)}
                                                         deleted={this.onDelete.bind(this)}/>)
                    }
                    </tbody>
                </Table>
                <this.state.form api={this.state.api} posted={this.onPost.bind(this)}/>
            </div>
        )
    }

    renderEmpty() {
        return (
            <div>
                <div className="d-flex flex-column justify-content-center">
                    <img src={logo} className="App-logo" alt={"loading"}/>
                    <h1>Collection is empty</h1>
                </div>
                <this.state.form api={this.state.api} posted={this.onPost.bind(this)}/>
            </div>
        )
    }

    componentDidMount() {
        Get(this.state.api, (data) => this.setState({items: data, isLoaded: true}))
    }
}

