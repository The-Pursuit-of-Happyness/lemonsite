import Link from 'next/link';
import { Button,Radio } from 'antd';
import "./index.less";

const Home = () => {
    return (
        <div>
            <p className="mylink">测试文字</p>
            <Link href={"/"}>
                <a >主页</a>
            </Link>
            <Link as={`/item/123`} href={"/"}>
                <a>item</a>
            </Link>
            <Button type="primary">Primary</Button>
            <Radio>Radio</Radio>
        </div>
    )
}

export default Home;