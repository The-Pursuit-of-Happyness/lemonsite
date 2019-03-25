import App,{container} from 'next/app'
import React, { Fragment } from 'react'
import {withRouter} from 'next/router'
// import withReduxStore from '../lib/with-redux-store'
import {Provider}from 'react-redux';
// import Header from '../components/Header';
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import Router from 'next/router'
import Nprogress from 'nprogress'

import "./index.less"



class MyApp extends App{
    // constructor(){
    //     super();
    //     this.state = {
    //         userAgent :{
    //             userAgent:'pc'
    //         }
    //     }
    // }

    // componentDidMount(){
    //     const ua = navigator.userAgent;
    //     let userAgent;
    //     if(ua.indexOf('Android')>0|| ua.indexOf('iPhone')>0 || ua.indexOf("iPad")>0){
    //         userAgent='mobile'
    //     }else{
    //         userAgent='pc';
    //     }
    //     this.setState({
    //         userAgent: {
    //           userAgent
    //         }
    //       })
    // }

    render(){
        // 页面顶部进度条
        Router.onRouteChangeStart = (url) =>{
            Nprogress.start();
        }
        Router.onRouteChangeComplete = ()=>Nprogress.done()
        Router.onRouteChangeError = ()=>NProgress.done()

        return(
            <Layout>
                <Fragment>
                    <h1>hello</h1>
                </Fragment>
            </Layout>
        )
    }
}

function TheApp(){
    return <p>aaaaaa</p>
}
export default TheApp;
// export default withReduxStore(withRouter(MyApp))