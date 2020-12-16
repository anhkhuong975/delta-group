import {GetStaticPaths, GetStaticProps} from "next";
import * as axios from "axios";
import React from "react";
import MainLayout from "../../components/layout/main-layout";
import {counter, HeaderActions} from "../../store/header.action";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import ErrorPage from "next/error";
import { withRouter } from 'next/router';

let bodyCounter: number = 0;
export const getStaticPaths: GetStaticPaths = async () => {
    const allProd = await axios.default({
        method: 'GET',
        url: 'https://eco-be.herokuapp.com/products/get-all/',
    })
    const paths = allProd.data.map(item => {
        return {
            params: {id: item.id.toString()}
        }
    });
    console.debug("============> in get static paths");
    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const res = await axios.default({
        method: 'GET',
        url: 'https://eco-be.herokuapp.com/products/get-one/' + params.id,
    })
    console.debug("=================> get static props");
    return {
        props: {
            products: res.data,
        },
        revalidate: 10
    }
}

interface PropsInfo {
    products: any[],
    router: any,
}

interface State {
    bodyCount: number
}

export class Info extends React.Component<Props, State>{
    // const router = useRouter();
    constructor(props) {
        super(props);
        this.state = {
            bodyCount: 0,
        }
        this.onClickUpdateBodyCounter = this.onClickUpdateBodyCounter.bind(this);
    }


    onClickUpdateBodyCounter() {
        this.setState({
            bodyCount: this.state.bodyCount + 1
        })
    }


    /**
     * INIT && UPDATED
     * @description this function use after init, and before render
     *
     * @param props
     * @param state
     *
     * @return object state
     */
    static getDerivedStateFromProps(props: Props, state: State) {
        return {
            bodyCount: 0,
        }
    }

    /**
     * INIT
     * @description this function use after render
     * process data
     *
     * @return void
     */
    componentDidMount() {
    }

    /**
     * UPDATE
     * @description this function use after update
     *
     */
    componentDidUpdate() {
    }

    /**
     * @description render to html and js
     */
    render() {
        if (this.props.router.isFallback) {
            return <div>loading...</div>
        }
        if (!this.props.products[0]) {
            console.log("IN ERROR PAGE")
            return <ErrorPage statusCode={404} />
        }
        const elem = (
            <div className='info-container'>
                <h1>INFO</h1>
                <ul>{
                    this.props.products.map((product, index) => (
                        <li key={index}>{product.name.split("").reverse().join("")}</li>
                    ))
                }</ul>
                <button onClick={this.props.counter}>update header counter</button>
                <div>
                    <button onClick={this.onClickUpdateBodyCounter}>update body counter</button>
                    <div>Body counter: <span>{this.state.bodyCount}</span></div>
                </div>
            </div>
        );
        return (<MainLayout child={elem}/>);
    }
}


const mapDispatchToProps = (dispatch: Dispatch<HeaderActions>) =>
    bindActionCreators({ counter }, dispatch);

type Props = PropsInfo & ReturnType<typeof mapDispatchToProps>;

export default connect(() => {return {}}, mapDispatchToProps)(withRouter(Info));
