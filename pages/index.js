import Link from "next/link";
import React from "react";

import { connect } from "react-redux";

class Default extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            plus: 0 ,
            showColor: false,
        }
    }

    handleClick(){
        const plus = this.props.plus +1 || 0;
        this.props.dispatch({ type: "PLUS", plus: plus })
    }

    toggleColor(){
        this.props.dispatch({ type: "CHANGE", showColor: !this.props.showColor })
    }

    render() {
        return (
            <div>
                <button onClick={() => this.handleClick() }>点我累计 {this.props.plus}</button>
                <button onClick={() => this.toggleColor()} style={{ backgroundColor: this.props.showColor ? 'red':'pink'}}>点我变色</button>
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return {...state }
}
export default connect(mapStateToProps)(Default);