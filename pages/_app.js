import React from 'react';
import App,{Container}from 'next/app'
import Router from 'next/router'
import Nprogress from 'nprogress'
import Menu from '../components/Menu'

class Layout extends React.Component{
    render(){
        const {children,className} = this.props;
        return <div className={className}>
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
        window.location.href=url;
    };
    Router.onRouteChangeComplete = ()=>Nprogress.done();
    Router.onRouteChangeError = ()=>NProgress.done();
    const {Component,pageProps, router: { pathname }} = this.props;
    return <Container >
        {
            pathname === '/home' ? <Component {...pageProps}/> : <Layout  className="container" >
                <Menu>
                    <Component {...pageProps}/>
                </Menu>
            </Layout>
        }

        <style jsx global>{`
            #__next,.container{
                height: 100%;
            }
            .container{
                display: flex;
                flex-direction: column;
            }
        `}</style>

    </Container>
  }
}
export default Page;
