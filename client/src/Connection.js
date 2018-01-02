import React, { Component } from 'react';
import {subscribeToConnectionEvent} from "./api";

export default class Connection extends Component {
    state = {
        connectionState: "connecting",
    };

    constructor(props) {
        super(props);
        subscribeToConnectionEvent(({
            state: connectionState,
            port,
        }) => {
            this.setState({
                connectionState,
                port,
            });
        });
    }

    render() {
        let content = null;

        const {connectionState} = this.state;

        switch(connectionState) {
            case "disconnected":
                content = (
                    <div className="Connection-error">
                        We've lost connection to our server...
                    </div>
                );
                break;
            case "connecting":
                content = (
                    <div>
                        Connecting...
                    </div>
                );
                break;
        }

        return (
            <div className="Connection">
                <div className="Connection-port">
                    Socket port: {this.state.port}
                </div>
                {content}
            </div>
        );
    }
}