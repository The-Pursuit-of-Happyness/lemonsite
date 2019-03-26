import React,{Component,Fragment} from 'react';
import {Input,Button} from 'antd';
// import 'isomorphic-unfetch';
import './index.less'
import * as restService from "../../servers/api"

class Login extends Component{
    constructor(){
        super();
        this.state ={
            userName:'',
            password:'',
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
        const res =await restService.login({name:"张三",password:'12321312'});    
        console.log(res);
        console.log("点击提交");
    }
    render(){
        return <Fragment>
        <label>姓名：</label>
        <Input onChange={this.inputName}></Input>
        <label>密码：</label>
        <Input type="password" onChange={this.inputPwd}></Input>
        <Button onClick={this.submit}>提交</Button>
        </Fragment>
    }
}

export default Login;