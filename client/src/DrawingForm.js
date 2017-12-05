import React, {Component} from "react";
import {createDrawing} from "./api";

export default class DrawingForm extends Component {
    state = {
        drawingName: "",
    }

    onChange = ({target: {value}}) => this.setState(prev => ({
        drawingName: value,
    }));

    handleSummit = evt => {
        evt.preventDefault();
        createDrawing(this.state.drawingName);
        this.setState(prev => ({
            drawingName: "",
        }));
    }

    render() {
        return (
            <div className="Form">
                <form onSubmit={this.handleSummit}>
                    <input
                        type="text"
                        value={this.state.drawingName}
                        onChange={this.onChange}
                        placeholder="Drawing name"
                        className="Form-drawingInput"
                        required
                    />
                    <button
                        type="submit"
                        className="Form-button"
                    >Create</button>
                </form>
            </div>
        );
    }
}