import React from 'react';

const Post = ({post}) => (
    <div className="card border-primary mb-3 post__item" style={{maxWidth: "20rem"}}>
            <div className="card-header">{post.id}</div>
            <div className="card-body">
                <h4 className="card-title">{post.title}</h4>
                <p className="card-text">{post.body}</p>
            </div>
    </div>
);


export default Post;