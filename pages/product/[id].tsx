import {GetStaticPaths, GetStaticProps} from "next";
import * as axios from "axios";
import Layout from "../../components/layout";
import {useRouter} from "next/router";

export default function Product({products}) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>loading...</div>
    }
    return (
        <Layout>
            <div>
                <h3>LIST</h3>
                <ul>{
                    products.map((product, index) => (
                        <li key={index}>{product.name.split("").reverse().join("")}</li>
                    ))
                }</ul>
            </div>
        </Layout>
    )
}

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
    console.debug("==================> in get static PATHS: ", allProd.data.length);
    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const res = await axios.default({
        method: 'GET',
        url: 'http://eco-be.herokuapp.com/products/get-one/' + params.id,
    })
    console.debug("=================> get static PROPS: ", params.id);

    return {
        props: {
            products: res.data,
        },
        revalidate: 5
    }
}
