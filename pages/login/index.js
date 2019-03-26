import React,{Component,Fragment} from 'react';
import { connect } from "react-redux";
import {Input,Button} from 'antd';
import './index.less'
import { userLogin } from '../../store/actions';

class Login extends Component{
    constructor(){
        super();
        this.state ={
            userName:'张三',
            password:'123456',
        }
    }
    inputName = event=>{
        const info = event.target.value;
        this.setState({userName:info});
    }
    inputPwd = event=>{
        const info = event.target.value;
        this.setState({password:info});
    }
    submit = async ({ req })=>{ 
        const { dispatch } = this.props
        userLogin(dispatch, {name:this.state.userName,password:this.state.password});
    }
    static getInitialProps({ store, isServer, pathname, query }) {
        store.dispatch({ type: "FOO", payload: "foo" }); // component will be able to read from store's state when rendered
       return { custom: "custom" }; // you can pass some custom props to component from here
      }
    render(){
        return <Fragment>
        <label>姓名：</label>
        <Input onChange={this.inputName}></Input>
        <label>密码：</label>
        <Input type="password" onChange={this.inputPwd}></Input>
        <Button onClick={this.submit}>提交</Button>
        <div>Prop from Redux {this.props.foo}</div>
        <div>Prop from getInitialProps {this.props.custom}</div>

        <p>{this.props.userInfo }</p>
        </Fragment>
    }
}

const mapStateToProps = state => {
    const {userInfo}  = state;
    return {userInfo};
}

export default connect(mapStateToProps)(Login);