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
    addarticle = () => {
        this.props.dispatch({
          type: 'article/addArticle',
          payload: {
            authorId: '9599',
            tag: '前端',
            articleName: 'vue 必知必会',
            articleType: '1',
            articleContent: "哈哈哈，噢噢噢噢哦哦哈哈哈我是文章内容哦，点我点我。。。。",
            source: '原创文章',
            createtime: '201905014',
            lastModification: '201905015',
            pageView: 127, //阅读量
            comment: 12,
            likeNum: 12,
            linkicon: 'https://www.baidu.com/link?url=ivNX4SzQpwAvn3XVZxO_6sNKSHIHw2sFOY8vePnXaZySgR1-GTwYz1HA3QUreQHVo-k96SD69wDAq_Agiberl2Ojb_DxOGp20zBxJwsVMQqFjgFXkBmG0s1dMkFrv5sLowS8vawluyWGSpTTFgH_vhTymTjZlslXe9jLc42zUNtTklkU-mJXjiY5kr7YhFSG88o4tmePNlbSypgg1HfZmWc0xvwlvZMIbt0JVEtvm85D5t_8e7TCiJeO-rJ8vzb5W42scXlD1DdW5KNr52RN3EdU6wS8cDwh3NTSJg3MSbHGH1pPxxZR2nsP6cLP21QOJqr1C4U57ZxK3wvjs2CK79WFyqzvM95G5X7FkXGURI4KsR5WWdx2VfDeviHXH54e02tFjYxtArXQECrt0hIAWJeJlaiDTGMDkHipfjlXo76YKww-3O3l9cQNgjyLhOe4qefWqw6kaPBKNHaiaPrcs63OcP4LDOiicc4oaCROStty-NYd7kmJrJbNJLWvtBgRuzqaLEMJu9bPPoUoJ6VEac-uWOn1yAn7mGfyqWSbf1N3oWxsYCYXUuQL9CYlSGQ-agfC1IOpEyTbksinpkqq_q&wd=&eqid=a2d4599e00000fff000000035cdcbe9d',
            artiidId: '980',
            imageUrl: 'http://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E5%A4%B4%E5%83%8F&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=undefined&latest=undefined&copyright=undefined&cs=3980296397,2994447821&os=2416485564,3633231851&simid=0,0&pn=29&rn=1&di=80822429270&ln=3516&fr=&fmq=1390280702008_R&fm=&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&oriquery=%E5%A4%B4%E5%83%8F&objurl=http%3A%2F%2Fpic4.zhimg.com%2Fv2-8bebb8272b724b7d2b398801f5f7f8c3_b.jpg&rpstart=0&rpnum=0&adpicid=0&force=undefined',
            commentCount: 20,
          }
        })
      }

      deletearticle =()=>{
          this.props.dispatch({
              type:'article/deleteArticle',
              payload:{
                  _id:"5cdd308ff2bd3e35dc79a215",
              }
          })
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
            <Button onClick={this.addarticle}>添加文章</Button>
            <Button onClick={this.deletearticle}>删除文章</Button>

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
            user:state.user,
            article:state.articleinfo
        };
    }
)(Login);
