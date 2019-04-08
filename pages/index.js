import Link from 'next/link';
import { Button } from 'antd';
import Test from '../components/Layout';
import 'isomorphic-unfetch';
import Head from 'next/head'
import './style.less';
import Menu from '../components/Menu';
import Home from './home';


// import dva from 'dva';
// import './index.css';
// import createHistory from 'history/createBrowserHistory'
import { createMemoryHistory } from 'history';
import React from "react";


const Index = ({ stars }) => <div style={{height:'100%'}}>
    <Head>
        <title>My page title</title>
        <meta charSet='utf-8' />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Home />
    </div>


Index.getInitialProps = async ({ req }) => {
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
}
export default Index;
