import React from "react";
// import {HeaderLayout} from "./header-layout";
import FooterLayout from "./footer-layout";
import HeaderLayout from "./header-layout";
// import HeaderLayout from "./header-layout";

export default class MainLayout extends React.Component<{child?: React.ReactNode}, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-container">
                <HeaderLayout/>
                <h5>wrap of main component</h5>
                <div>
                    {this.props.child}
                </div>
                <FooterLayout/>
            </div>
        );
    }
}
