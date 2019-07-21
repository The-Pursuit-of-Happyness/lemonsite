import React from "react";
import moment from 'moment';
import Link from 'next/link';
import { Select, Input, Icon, Button, Tag, Tabs,Upload, } from 'antd';
import './index.less';
import WithDva from '../../utils/store';

const Option = Select.Option;
const TabPane = Tabs.TabPane;
class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fileList: [],
            type:'title',
            key:'',
            activeKey:'update'
        };
    }

    componentDidMount() {
        const { dispatch }  = this.props;
        const { key, type } = this.state;
        dispatch({
            type:'article/getArticleList',
            payload:{
                type,
                key,
            }
        });

        dispatch({
            type:'article/getTagList'
        })
    }
    // 导入Excel
    importExcel = file => {
        const { dispatch }  = this.props;
        dispatch({
        type: 'article/importExcel',
        payload: file,
        });
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
                    <div ><Link href={`/articleDetails?id=${item.artiidId}`}><a className={'articleName'}>{item.articleName}</a></Link><span className={'tag'}>{item.tag}</span></div>
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
        console.log('this.props:',this.state);
        const { article } = this.props;
        const articleList = article && article.articleList || [];
        const tagList = article && article.tagList || [];
        let thiz = this;
         const uploadconfig = {
      onChange(info) {          
        const formData = new FormData();
        formData.append('fileImport', info.file.originFileObj);
        thiz.importExcel(formData);
      },
      name: 'file',
      multiple: false,
      accept:".xls, .xlsx"
    };
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
                <Upload {...uploadconfig} fileList={this.state.fileList}>
                    <Button icon="import">导入Excel</Button>
                  </Upload>
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
                       <Tabs defaultActiveKey="update" onChange={this.onChangeTab}  onTabClick={(e)=> this.setState({activeKey:e})}>
                           <TabPane tab="最近更新" key="update" className={'box'}>
                               {articleList.map((item,index) => <div className={"updataItemBox"}>
                                   <div className={'articleName'}>{item.articleName}</div>
                                   <button onClick={()=> this.setState({activeKey: 'Leaderboard-2'})}></button>
                                   <div>
                                       <Icon type={'edit'}/>
                                       <span>{moment(item.date).format('MM-DD')}</span>
                                   </div>
                               </div>)}
                           </TabPane>
                           <TabPane tab="排行榜1" key="Leaderboard" className={'box'}>
                               {articleList.map((item,index) => <div className={"updataItemBox"} key={`${index}`}>
                                   <div className={'articleName'}>{item.articleName}</div>
                                   <div>
                                       <Icon type={'eye'}/>
                                       <span>{item.readCount}</span>
                                   </div>
                               </div>)}
                           </TabPane>
                       </Tabs>

                   </div>
               </div>
           </div>
        )
    }
}

export default WithDva((state) => {
    return { article:state.article }
})(Article);

