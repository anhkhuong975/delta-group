import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export const HEADER_TITLE = {
  luong: "Bao nhiêu ngày đến lương",
};

export default function Home({
  allPostsData
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <div className="home-component">
      <Head>
        <title>DETA - GROUP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div className="body">
        <div className="row pt-3">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="card border-light mb-3 counter-wrap" style={{maxWidth: '18rem'}}>
              <div className="card-header p-1 text-white text-center bg-warning">{HEADER_TITLE.luong}</div>

              <div className="card-body text-info text-center">
                <div className="counter-number">12 : 13 : 13</div>
              </div>
            </div>
          </div>



        </div>



      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
