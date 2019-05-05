import React from 'react';
import moment from 'moment';
import { withRouter } from 'next/router';
import WithDva from '../../utils/store';
import { Select, Input, Icon, Button, Tag, Tabs } from 'antd';
import './index.less';

class ArticleDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
      const { dispatch, router } = this.props;
      const { query } = router;
        dispatch({
            type:'articleDetails/getArticleDetail',
            payload:{
               id:query.id
            }
        })
    }

    render(){
        console.log('详情：',this.props);
        const { articleDetail } = this.props;
        const detail = articleDetail.articleDetail || null;
        return (
            <div className="articleDetailBox">
                <div className={'leftBox'}>
                    <div className={'leftBox-left'}>
                        <Icon type={'like'}/>
                        <Icon type={'message'}/>
                        <Icon type="twitter" />
                        <Icon type="weibo" />
                    </div>
                    <div className={'leftBox-right'}>
                        <h2>{detail && detail.articleName}</h2>
                        <div className={'tagBox'}>
                            <div className={'yuan'}>原</div>
                            <div className={'tag'}>{detail && detail.tag}</div>
                        </div>
                        <div className={'basicInfoBox'}>
                            <div className={'date'}>发布时间：{moment(detail && detail.date).format('YYYY-MM-DD')}</div>
                            <div  className={'icon'}><Icon type='user' /> {detail && detail.author}</div>
                            <div  className={'icon'}><Icon type="eye" />{detail && detail.readCount}</div>
                            <div  className={'updateDate'}>更新时间：{moment(detail && detail.updateDate).format('YYYY-MM-DD')}</div>
                        </div>
                    </div>

                </div>
                <div className={'rightBox'}></div>
            </div>
        )
    }
}

export default WithDva(state => {
    console.log('state:',state);
    return {
        articleDetail: state.articleDetails
    }
})(withRouter(ArticleDetail));
