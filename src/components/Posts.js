import React from 'react';
import Post from './Post';
import axios from 'axios';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true
        }
    }

    componentDidMount() {
       this.fetchPosts();
    }

    fetchPosts = async () => {
        // Promise way
            // fetch('https://jsonplaceholder.typicode.com/posts')
            // .then(response => response.json())
            // .then(json => {
            //     this.setState({
            //         ...this.state,
            //         posts: json,
            //         loading: false
            //     });
            // });

        // async / await way ( with fetch API )
            // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            // const json = await response.json();
            // this.setState({
            //     ...this.state,
            //     posts: json,
            //     loading: false
            // });
            
       // async / await ( axios way )
       const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
       this.setState({
         ...this.state,
         posts: response.data,
         loading: false  
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