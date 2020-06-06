import React from 'react';
import Post from './Post';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        }
    }

    componentDidMount() {
       fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    posts: json,
                    loading: false
                });
            }, 500);
        });
    }

    renderPosts = () => {
      const { posts } = this.state;
      const topPosts = posts.slice(0,8);
      if(posts.length > 0) {
        return topPosts.map(post => (
                <Post key={post.id} post={post}/>
            ));
      }
    }

    render() {
        const { loading } = this.state;
        return (
            <React.Fragment>
              {loading && <h2>Loading...</h2>}
              <div className="post__items">{ this.renderPosts() }</div>
            </React.Fragment>
        )
    }
}

export default Posts;