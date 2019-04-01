import React,{Component,Fragment} from 'react';
import Link from 'next/link';
import {Input,Button} from 'antd';
import './index.less'
import WithDva from '../../utils/store';

class Login extends Component{
    constructor(){
        super();
        this.state ={
            userName:'张三',
            password:'123456',
        }
    };

    inputName = event=>{
        const info = event.target.value;
        this.setState({userName:info});
    };

    inputPwd = event=>{
        const info = event.target.value;
        this.setState({password:info});
    };

    submit =()=>{
        this.props.dispatch({type:"user/userLogin",payload:{
            name:this.state.userName,password:this.state.password
        }})
    }

    // static async getInitialProps(props) {
    //     // first time run in server side
    //     // other times run in client side ( client side init with default props
    //     // console.log('get init props');
    //     const {
    //       pathname, query, isServer, store,
    //     } = props;
    //     // dispatch effects to fetch data here
    //     return {
    //       // dont use store as property name, it will confilct with initial store
    //       pathname, query, isServer, dvaStore: store,
    //     };
    //   }
    render(){
        const {user}  = this.props;
        const {userInfo} = user;

        return <Fragment>
            <label>姓名：</label>
            <Input onChange={this.inputName}></Input>
            <label>密码：</label>
            <Input type="password" onChange={this.inputPwd}></Input>
            <Button onClick={this.submit}>提交</Button>

            <p>{userInfo&&userInfo.name? userInfo.name:'' }</p>
            <p>{userInfo&&userInfo.age? userInfo.age:'' }</p>

             <div>
            <Link href="/about">
                <a>点我跳转About页面</a>
            </Link>
        </div>
        </Fragment>
    }
}

export default WithDva(
    (state)=>{
        return {
            user:state.user
        };
    }
)(Login);
