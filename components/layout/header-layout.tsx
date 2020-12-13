import React from "react";
import * as axios from "axios";
import {HeaderState} from "../../store/header.type";
import {bindActionCreators, Dispatch} from "redux";
import {counter, HeaderActions} from "../../store/header.action";
import {connect} from "react-redux";

interface State {
    count: number,
    totalProducts: number,
}
export class HeaderLayout extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            totalProducts: 0,
        }
        this.counter = this.counter.bind(this);
        this.getProduct = this.getProduct.bind(this);
    }

    counter() {
        this.setState({
            count: this.state.count + 1,
        })
    }

    async getProduct() {
        const allProd = await axios.default({
            method: 'GET',
            url: 'http://eco-be.herokuapp.com/products/get-all/',
        })
        if (allProd.data) {
            this.setState({
                totalProducts: allProd.data.length
            })
        }
    }

    /**
     * @description render element
     */
    render() {
        return (
            <div className="header-container">
                <h3>HEADER</h3>
                <button onClick={this.props.counter}>counter</button>
                <button onClick={this.getProduct}>get prod</button>
                <div>Count: <span>{this.props.count}</span></div>
                <div>Prod name: <span>{this.state.totalProducts}</span></div>
            </div>
        );
    }
}
const mapStateToProps = (state: HeaderState) => ({
    count: state.count
});

const mapDispatchToProps = (dispatch: Dispatch<HeaderActions>) =>
    bindActionCreators({ counter }, dispatch);

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLayout);
