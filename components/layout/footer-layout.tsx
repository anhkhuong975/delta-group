import React from "react";

interface Props {
    count?: number,
}

interface State {
    count: number,
}
export default class FooterLayout extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            count: 0,
        }
    }
    render() {
        return (
            <div className="footer-container">
                <h3>Footer</h3>
                <div>Count: {this.state.count}</div>
            </div>
        );
    }
}
