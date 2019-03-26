import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App, {Container} from "next/app";
import reducer from '../store/reducer';

const store = createStore(reducer);

class Layout extends React.Component{
    render(){
        const {children} = this.props;
        return <div className='layout'>
            {children}
        </div>
    }
}

export default class MyApp extends App{

    static async getInitialProps ({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render(){
        const {Component,pageProps} = this.props
        return <Container>
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps}/>
                    </Layout>
                </Provider>
        </Container>
    }
}