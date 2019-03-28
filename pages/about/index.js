import React, { Component } from 'react';
import {Tag} from "antd";
import WithDva from '../../utils/store';

import './index.less';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "一段文字哦"
    }
  }

  componentDidMount(){

  }
  static async getInitialProps(props) {
    const {
              pathname, query, isServer, store,
            } = props;
            // dispatch effects to fetch data here
            store.dispatch({
                type:'user/getAppInfo',
                payload:''
            })  
            return {
              // dont use store as property name, it will confilct with initial store
              pathname, query, isServer, dvaStore: store,
            };
            
      }

  render(){
    const {user}  = this.props;
    const {userInfo,appInfo} = user;
      const mylist = ["不错哦","哈哈哈","额鹅鹅鹅","猪猪猪猪","嗯嗯"];
      return (
          <div>
              {
                  mylist.map(item=><Tag key={item}>{item}</Tag>)
              }

              <p className="message">{this.state.message}</p>

              <p key="version">{appInfo&&appInfo.version? appInfo.version:'' }</p>
              <p key="time">{appInfo&&appInfo.time? appInfo.time:'' }</p>


              <p key="name">{userInfo&&userInfo.name? userInfo.name:'请先获取用户信息' }</p>
          </div>
      )
  }
}

export default WithDva(
    (state)=>{
        return {
            user:state.user
        };
    }
)(About);