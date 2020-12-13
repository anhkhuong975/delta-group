import React from "react";

interface Props {
    count?: number,
}
interface State {
    count: number,
}
export class HeaderLayout extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
        this.counter = this.counter.bind(this);
    }

    counter() {
        this.setState({
            count: this.state.count + 1,
        })
    }

    /**
     * @description render element
     */
    render() {
        return (
            <div className="header-container">
                <h3>HEADER</h3>
                <button onClick={this.counter}>counter</button>
                <div>Count: <span>{this.state.count}</span></div>
            </div>
        );
    }
}
