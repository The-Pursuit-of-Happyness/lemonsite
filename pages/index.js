import Link from 'next/link';
import { Button } from 'antd';
import Test from '../components/Layout';
import 'isomorphic-unfetch';
import Head from 'next/head'
import './style.less'

// import dva from 'dva';
// import './index.css';
// import createHistory from 'history/createBrowserHistory'
import { createMemoryHistory } from 'history';

const PostLink = (props) => (
    <div>
        <li className={'liStyle'}>
            <Link as={`/weizhuang`} href={`/item?title=${props.title}&id=${props.id}`}>
                <a>{props.title}</a>
            </Link>
        </li>
        <style jsx>{`
          .liStyle {
            font-size:17px;
            color:red;
          }
        `}
        </style>
    </div>
);
const Index = ({ stars }) => <div className="example">
    <Head>
        <title>My page title</title>
        <meta charSet='utf-8' />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
        <div>
            <Link href="/home">
                <a>点我跳转home页面</a>
            </Link>
        </div>
        <div>
            <Link href="/login">
                <a>点我跳转login页面</a>
            </Link>
        </div>
        <div>
            <Link href="/about">
                <a>点我跳转about页面</a>
            </Link>
        </div>
        <div>
            <Link href="/reduxDemo">
                <a>点我跳转reduxDemo页面</a>
            </Link>
        </div>

         <Button type="primary">Primary</Button>
         <p className={'mytest'}>我的测试文字</p>
        <ul>
            <PostLink title={"我是路由伪装"} id={'123456'}/>
        </ul>
        <img src={'static/sleep.png'}/>
        <div>我是异步请求的结果：{stars}</div>
    </div>


Index.getInitialProps = async ({ req }) => {
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
}
export default Index;
