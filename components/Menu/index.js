import React from 'react';
import { Menu } from 'antd';
import './index.less'

const MenuItem = Menu.Item;
export default class Menus extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentKey:'home'
        };
    }

    handleClick = e => {
        console.log('eee:',e);
        this.setState({
            currentKey: e.key
        })
    }

    render(){
        const { children } = this.props;
        return <div className={'page'}>
            <div className={'menuBox'}>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.currentKey]} mode={'horizontal'} className={'menus'}>
                <MenuItem key={'home'}>
                    网站首页
                </MenuItem>
                <MenuItem key={'blok'}>
                    文章列表
                </MenuItem>
                <MenuItem key={'life'}>
                    生活记录
                </MenuItem>
                <MenuItem key={'resource'}>
                    在线资源
                </MenuItem>
                <MenuItem key={'about'}>
                    关于我们
                </MenuItem>
                <MenuItem key={'log'}>
                    更新日志
                </MenuItem>
            </Menu>
            </div>
                <div className={'contentBox'}>
                    { children }
                </div>
            </div>

    }
}
