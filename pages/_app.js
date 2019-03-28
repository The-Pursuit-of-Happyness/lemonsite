import React from 'react';
import App,{Container}from 'next/app'
import Router from 'next/router'
import Nprogress from 'nprogress'

class Layout extends React.Component{
    render(){
        const {children} = this.props;
        return <div className='layout'>
            {children}
        </div>
    }
}

class Page extends App {
    static async getInitialProps({Component,ctx}){
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) :{}
        return {pageProps};
    }

  render() {
      // 页面顶部进度条
      Router.onRouteChangeStart = (url) =>{
        Nprogress.start();
    }
    Router.onRouteChangeComplete = ()=>Nprogress.done()
    Router.onRouteChangeError = ()=>NProgress.done()
    const {Component,pageProps} = this.props
    return <Container>      
        <Layout >
            <Component {...pageProps}/>
        </Layout> 
    </Container>
  }
}
export default Page;
