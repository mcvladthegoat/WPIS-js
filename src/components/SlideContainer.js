import React, { Component, PropTypes } from 'react';

import styles from "../assets/css/style.css";

export class SlideContainer extends Component {
    constructor(state, props) {
        super(state, props);
        this.state = {
            currValue: props.initialValue
        };
        this._onDrag = this._onDrag.bind(this);
    }

    _onDrag(e) {
        const { onDrag } = this.props;
        this.setState({
            currValue: e
        });
        onDrag(e);
    }

    render() {
        const { currValue } = this.state;
        const { initialValue } = this.props;

        return(
            <input
                type="range"
                onChange={this._onDrag}
                onInput={this._onDrag}
                min="0"
                className="slider"
                id="myRange"
                style={{width: "500px"}}
            />
        )
    }
}
