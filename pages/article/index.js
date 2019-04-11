import React from "react";
import moment from 'moment';
import Link from 'next/link';
import { Select, Input, Icon, Button, Tag, Tabs } from 'antd';
import './index.less';
import WithDva from '../../utils/store';

const Option = Select.Option;
const TabPane = Tabs.TabPane;
class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type:'title',
            key:''
        };
    }

    componentDidMount() {
        const { dispatch }  = this.props;
        const { key, type } = this.state;
        console.log(' key, type ', key, type );
        dispatch({
            type:'article/getArticleList',
            payload:{
                type,
                key,
            }
        })

        dispatch({
            type:'article/getTagList'
        })
    }

    selectType = e => {
        console.log('e:',e);
        this.setState({
            type: e
        })
    }

    handleOnChangeInput = e => {
        this.setState({
            key: e.target.value
        })
    }

    searchArticle = () => {
        const { dispatch }  = this.props;
        const { key, type } = this.state;
        dispatch({
            type:'article/getArticleList',
            payload:{
                type,
                key,
            }
        })
    }

    articleItemBox(item,index){
        return (
            <div key={`${index}`} className={'articleItemBox'}>
                <div className={'articleNameBox'}>
                    <div ><span className={'articleName'}>{item.articleName}</span><span className={'tag'}>{item.tag}</span></div>
                    <div><img src={item.imageUrl} style={{width:50,}}/></div>
                </div>
                <div className="infoBox">
                    <div className={'date'}><span >{moment(item.date).format('YYYY-MM-DD')}</span></div>
                    <div><Icon type="star" className={"icon"}/>{item.keepCount}</div>
                        <div><Icon type="heart" className={"icon"}/>{item.likeCount}</div>
                            <div><Icon type="message"className={"icon"}/>{item.readCount}</div>
                                <div><Icon type="eye" className={"icon"}/>{item.readCount}</div>
                </div>
            </div>
        )
    }

    onChangeTab = e => {
    }

    render(){
        console.log('this.props:',this.props);
        const { article } = this.props;
        const articleList = article && article.articleList || [];
        const tagList = article && article.tagList || [];
        return (
           <div className={'articleContentBox'}>
               <div className={'leftBox'}>
                   <div className={'headBox'}>
                       <Select style={{ width: 150 }} onChange={this.selectType} defaultValue={'按title模糊搜索'}>
                           <Option value={"title"}>按title模糊搜索</Option>
                           <Option value={"article"}>按article模糊搜索</Option>
                       </Select>
                       <Input placeholder='请输入关键字进行模糊搜索' onChange={this.handleOnChangeInput}/>
                       <Button onClick={this.searchArticle}>搜索</Button>
                   </div>
                   <div className={'articleListBox'}>
                      {articleList.map((item,index) => this.articleItemBox(item,index))}
                   </div>
               </div>
               <div className={'rightBox'}>
                   <div className={'tagBox'}>
                       <h2>相关标签</h2>
                       <div>
                           {
                               tagList.map((tag,index) => <Tag key={`${index}`} color="blue">{tag}</Tag>)
                           }
                       </div>
                   </div>
                   <div>
                       <Tabs defaultActiveKey="update" onChange={this.onChangeTab}>
                           <TabPane tab="最近更新" key="update" className={'box'}>
                               {articleList.map((item,index) => <div className={"updataItemBox"}>
                                   <div className={'articleName'}>{item.articleName}</div>
                                   <div>
                                       <Icon type={'edit'}/>
                                       <span>{moment(item.date).format('MM-DD')}</span>
                                   </div>
                               </div>)}
                           </TabPane>
                           <TabPane tab="排行榜" key="Leaderboard" className={'box'}>
                               {articleList.map((item,index) => <div className={"updataItemBox"} key={`${index}`}>
                                   <div className={'articleName'}>{item.articleName}</div>
                                   <div>
                                       <Icon type={'eye'}/>
                                       <span>{item.readCount}</span>
                                   </div>
                               </div>)}
                           </TabPane>
                       </Tabs>,
                   </div>
               </div>
           </div>
        )
    }
}

export default WithDva((state) => {
    return { article:state.article }
})(Article);

