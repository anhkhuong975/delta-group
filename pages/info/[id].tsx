import {GetStaticPaths, GetStaticProps} from "next";
import * as axios from "axios";
import React from "react";
import MainLayout from "../../components/layout/main-layout";
import {counter, HeaderActions} from "../../store/header.action";
import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";
import {useRouter} from "next/router";
import ErrorPage from "next/error";

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
}

function onClickUpdateBodyCounter() {
    bodyCounter = bodyCounter + 1;
}

export function Info(props: Props){
    const router = useRouter();
    if (router.isFallback) {
        return <div>loading...</div>
    }
    if (!props.products[0]) {
        console.log("IN ERROR PAGE")
        return <ErrorPage statusCode={404} />
    }
    const elem = (
        <div className='info-container'>
            <h1>INFO</h1>
            <ul>{
                props.products.map((product, index) => (
                    <li key={index}>{product.name.split("").reverse().join("")}</li>
                ))
            }</ul>
            <button onClick={props.counter}>update header counter</button>
            <div>
                <button onClick={onClickUpdateBodyCounter}>update body counter</button>
                <div>Body counter: <span>{bodyCounter}</span></div>
            </div>
        </div>
    );
    return (<MainLayout child={elem}/>);
}


const mapDispatchToProps = (dispatch: Dispatch<HeaderActions>) =>
    bindActionCreators({ counter }, dispatch);

type Props = PropsInfo & ReturnType<typeof mapDispatchToProps>;

export default connect(() => {}, mapDispatchToProps)(Info);
