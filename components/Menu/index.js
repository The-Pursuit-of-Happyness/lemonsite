import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import { withRouter } from 'next/router';
import './index.less'

const MenuItem = Menu.Item;
class Menus extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentKey:this.props.router.pathname.slice(1)
        };
    }

    handleClick = e => {
        console.log('eee:',e);
        this.setState({
            currentKey: e.key
        })
    };

    render(){
        const { children } = this.props;
        return <div className={'page'}>
            <div className={'menuBox'}>
            <Menu onClick={this.handleClick} selectedKeys={[this.state.currentKey]} mode={'horizontal'} className={'menus'}>
                <MenuItem key={'home'}>
                    <Link href={'/home'}><a>网站首页</a></Link>
                </MenuItem>
                <MenuItem key={'article'}>
                    <Link href={'/article'}><a>文章列表</a></Link>
                </MenuItem>
                <MenuItem key={'life'}>
                    <Link href={'/life'}><a>生活记录</a></Link>
                </MenuItem>
                <MenuItem key={'leetcode'}>
                    <Link href={'/leetcode'}><a>leetcode</a></Link>
                </MenuItem>
                <MenuItem key={'resource'}>
                    <Link href={'/resource'}><a>在线资源</a></Link>
                </MenuItem>
                <MenuItem key={'about'}>
                    <Link href={'/about'}><a>关于我们</a></Link>
                </MenuItem>
                <MenuItem key={'updateLog'}>
                    <Link href={'/updateLog'}><a>更新日志</a></Link>
                </MenuItem>
            </Menu>
            </div>
                <div className={'contentBox'}>
                    { children }
                </div>
            </div>

    }
}

export default withRouter(Menus)
