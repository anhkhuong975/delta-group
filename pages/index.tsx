import { getSortedPostsData } from '../lib/posts'
import { GetStaticProps } from 'next'
import {DbsGroup} from "../components/dbs-group";
import React from "react";


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
      <DbsGroup/>
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
