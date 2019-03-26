import Link from "next/link";
import React from "react";

import { connect } from "react-redux";

class Default extends React.Component {
    static getInitialProps({ store, isServer, pathname, query }) {
        store.dispatch({ type: "FOO", payload: "foo" }); // component will be able to read from store's state when rendered
        return { custom: "custom" }; // you can pass some custom props to component from here
    }
    render() {
        return (
            <div>content...</div>
        );
    }
}

export default connect()(Default);