import * as axios from "axios";

/**
 * @description get dat from API
 * @return {Promise<{props: {products: *}}>}
 */
export async function getStaticProps() {
    const res = await axios({
        method: 'get',
        url: 'http://eco-be.herokuapp.com/products/get-by-category/1',
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

export default function ListProduct({products}) {
    return (
        <div>
            <h1>LIST PRODUCT</h1>
            <ul>{
                products.map((product, index) => (
                    <li key={index}>
                        {product.name}
                    </li>
                ))
            }
            </ul>
        </div>
    )
}
