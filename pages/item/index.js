import { withRouter } from 'next/router';

const Post = (props) => (
    <div>
        <h1>{props.router.query.id}</h1>

    </div>
);

export default withRouter(Post);
