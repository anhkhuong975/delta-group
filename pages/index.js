import {getPageFiles} from 'next/dist/next-server/server/get-page-files';
import Head from 'next/head'
import Link from 'next/link';
import Layout from "../pages/components/layout";
import axios from "axios";
import useSWR from 'swr';
import { getSortedPostsData } from '../lib/posts';

const fetcher = url => axios.get(url).then(res => res.data);

// export async function getStaticProps() {
//
//     const res = await axios({
//         method: 'get',
//         url: 'http://eco-be.herokuapp.com/products/get-by-category/1',
//     });
//     return {
//         props: {
//             data: res.data
//         }
//     }
// }
export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

export default function Home({allPostsData}) {
    return (
        <Layout home>
            {/* Keep the existing code here */}

            {/* Add this <section> tag below the existing <section> tag */}
            <section>
                <h2>Blog</h2>
                <ul>
                    {allPostsData.map(({id, date, title}) => (
                        <li key={id}>
                            {title}
                            <br/>
                            {id}
                            <br/>
                            {date}
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}
