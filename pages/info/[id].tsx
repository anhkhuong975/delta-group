import {GetStaticPaths, GetStaticProps} from "next";
import * as axios from "axios";
import React from "react";
import MainLayout from "../../components/layout/main-layout";

export const getStaticPaths: GetStaticPaths = async () => {
    const allProd = await axios.default({
        method: 'GET',
        url: 'http://eco-be.herokuapp.com/products/get-all/',
    })
    const paths = allProd.data.map(item => {
        return {
            params: {id: item.id.toString()}
        }
    });
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const res = await axios.default({
        method: 'get',
        url: 'http://eco-be.herokuapp.com/products/get-one/' + params.id,
    })
    return {
        props: {
            products: res.data,
        }
    }
}

interface Props {
    products: any[],
}

interface State {
    products: any[],
}

export default class Info extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            products: [],
        }
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
            products: props.products,
        };
    }

    /**
     * INIT
     * @description this function use after render
     * process data
     *
     * @return void
     */
    componentDidMount() {
        console.log("component did mount");
    }

    /**
     * UPDATE
     * @description this function use after update
     *
     */
    componentDidUpdate() {
    }


    /**
     * INIT && UPDATED
     * @description render tsx to html
     *
     */
    render() {
        const elem = (
            <div className='info-container'>
                <h1>INFO</h1>
                <ul>{
                    this.state.products.map((product, index) => (
                        <li key={index}>{product.name.split("").reverse().join("")}</li>
                    ))
                }</ul>
            </div>
        );
        return (
            <MainLayout child={elem}/>
        );
    }
}
