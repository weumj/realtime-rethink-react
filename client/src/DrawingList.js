import React, {Component} from "react";
import {subscribeToDrawings} from "./api";

export default class DrawingList extends Component {
    constructor(props){
        super(props);

        subscribeToDrawings()
        .then(drawing => this.setState(prev => ({
            drawings: prev.drawings.concat([drawing]),
        })));
    }

    state = {
        drawings: [],
    }

    render() {
        const drawings = this.state.drawings.map(drawing => (
            <li
                className="DrawingList-item"
                key={drawing.id}
            >
                {drawing.name}
            </li>
        ));
        return (
            <ul className="DrawingList">
                {drawings}
            </ul>
        );
    }
}