import * as axios from "axios";

export async function getStaticPaths() {
    console.log('==============> In get static Paths');
    return { paths: [{params: {id: '1'}}], fallback: false };
}

export async function getStaticProps({params}) {
    console.log("================> Param: ", params.id)
    const res = await axios({
        method: 'get',
        url: 'http://eco-be.herokuapp.com/products/get-by-category/' + params.id,
    })

    if (res.data) {
        return {
            props: {
                products: res.data,
            }
        }
    } else {
        return {
            props: {
                products: [],
            }
        }
    }
}

export default function Product({products}) {
    return (
        <div>
            <div>PRODUCT INFO</div>
            <ul>
                {
                    products.map(product => (
                       <li>{product.name}</li>
                    ))
                }
            </ul>
        </div>
    )
}
