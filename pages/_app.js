import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App,{Container}from 'next/app'
import withRedux from 'next-redux-wrapper'
import {initializeStore} from '../store/store'

class Layout extends React.Component{
    render(){
        const {children} = this.props;
        return <div className='layout'>
            {children}
        </div>
    }
}

class MyApp extends App{
    static async getInitialProps({Component,ctx}){
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) :{}
        return {pageProps};
    }
    render(){
        const {Component,pageProps,store} = this.props
        return <Container>
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps}/>
                    </Layout>
                </Provider>
        </Container>
    }
}

export default withRedux(initializeStore)(MyApp);