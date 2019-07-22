import React from "react";
import moment from 'moment';
import Link from 'next/link';
import { Select, Input, Icon, Button, Tag, Tabs,Upload, } from 'antd';
import './index.less';
import WithDva from '../../utils/store';
const xlsx = require('xlsx');

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

    // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
 sheet2blob=(sheet, sheetName)=> {
    sheetName = sheetName || 'sheet1';
    var workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    var wbout = xlsx.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], {type:"application/octet-stream"});
    // 字符串转ArrayBuffer
    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
    return blob;
}
/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
 openDownloadDialog=(url, saveName)=>
{
    if(typeof url == 'object' && url instanceof Blob)
    {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if(window.MouseEvent) event = new MouseEvent('click');
    else
    {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}
    downLoadExcal = ()=>{
        var aoa = [
            ['姓名', '性别', '年龄', '注册时间'],
            ['张三', '男', 18, new Date()],
            ['李四', '女', 22, new Date()]
        ];
        var sheet = xlsx.utils.aoa_to_sheet(aoa);
        this.openDownloadDialog(this.sheet2blob(sheet), '导出.xlsx');
        console.log("下载文件");
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
                  <Button onClick={this.downLoadExcal}>下载表格</Button>
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

