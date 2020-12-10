import {GetStaticPaths, GetStaticProps} from "next";
import * as axios from "axios";

export default function Product({products}) {
    return(
        <div>
            <h3>LIST</h3>
            <ul>{
                products.map((product, index) => (
                    <li key={index}>{product.name}</li>
                ))
            }</ul>
        </div>
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
