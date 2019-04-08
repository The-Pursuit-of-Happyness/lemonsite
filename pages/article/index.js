import React from "react";
import Link from 'next/link';


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

const Article = () => (
    <div>
        <h1>文章列表页面</h1>
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
            <Link href="/updateLog">
                <a>点我跳转updateLog页面</a>
            </Link>
        </div>
        <div>
            <Link href="/leetcode">
                <a>点我跳转leetcode页面</a>
            </Link>
        </div>
        <ul>
            <PostLink title={"我是路由伪装"} id={'123456'}/>
        </ul>
        <img src={'static/sleep.png'}/>
    </div>
);

export default Article;

