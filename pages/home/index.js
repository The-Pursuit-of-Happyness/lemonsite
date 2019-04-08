import Link from 'next/link';
import "./index.less";
import React, { Fragment } from 'react';

const imgArr = ['static/picture1.jpg','static/picture2.jpg','static/picture3.jpg','static/picture4.jpg'];
let timer;
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            indexBg:0,
        }
    }

    componentDidMount() {
        timer = setInterval(()=>{
            let indexBg = this.state.indexBg+2 > imgArr.length ? 0 : this.state.indexBg +1;
            this.setState({indexBg: indexBg })
        },2000)
    }

    componentWillUnmount(){
        clearInterval(timer)
    }

    render(){
        const list = [{
            title:'技术文章(article)',
            id:'article'
        },{
            title:'生活记录(life)',
            id:'life'
        },{
            title:'在线资源（resource）',
            id:'resource'
        }];
        const { indexBg } = this.state;
        return <div className={'homeContent'} style={{backgroundImage:`url(${imgArr[indexBg]})`}}>
            <div className={'sideBox'}>
                <div className={'title'}>X & G的站点</div>
                <div className={'subTitle'}>X&G's website</div>
                <div className={'contentList'}>
                    {
                        list.map((l,index) => <div key={`${index}`} className={'item'}>
                            <Link href={`/${l.id}`}><a className={'linkText'}>》{l.title}</a></Link></div>)
                    }
                </div>
                <div className={'tipText'}><Link href={'/'}><a className={'linkText'}>connect | http://www.baidu.com </a></Link></div>
            </div>
        </div>
    }
}
