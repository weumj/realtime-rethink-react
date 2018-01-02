import React, {Component} from "react";
import Canvas from "simple-react-canvas";
import {publishLine, subscribeToDrawingLines} from "./api";

class Drawing extends Component {
    state = {
        lines: [],
    };

    componentDidMount() {
        subscribeToDrawingLines(this.props.drawing.id)
            .then(linesEvent => this.state(prevState => ({
                lines: [...prevState.lines, ...linesEvent.lines],
            })));
    }

    handleDraw = line => publishLine({
        drawingId: this.props.drawing.id,
        line,
    });

    render() {
        return this.props.drawing ?
        (
            <div
                className="Drawing"
            >
                <div className="Drawing-title">{this.props.drawing.name}</div>
                <Canvas
                    drawingEnabled
                    onDraw={this.handleDraw}
                    lines={this.state.lines}
                />
            </div>
        ) : null;
    }
}

export default Drawing;
