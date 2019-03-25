import React, { Component } from 'react';
import {Tag} from "antd";

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

  render(){
      const mylist = ["不错哦","哈哈哈","额鹅鹅鹅","猪猪猪猪","嗯嗯"];
      return (
          <div>
              {
                  mylist.map(item=><Tag>{item}</Tag>)
              }

              <p className="message">{this.state.message}</p>
          </div>
      )
  }
}

export default About;