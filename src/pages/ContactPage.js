import React from 'react';
import axios from 'axios';

class ContactPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentPage: 1,
            perPage: 3,
            totalPages: 0,
            scrolling: false,
            query: "",
            message: ""
        }
        this.cancel = "";
    }

    componentDidMount() {
        // this.loadUsers();
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e);
        });
    }

    handleScroll = (e) => {
        const { scrolling, totalPages, currentPage } = this.state;
        if(scrolling) return;
        if(totalPages <= currentPage) return;
        const lastItem = document.querySelector('.cards > .card:last-child');
        const lastItemOffset = lastItem.offsetTop + lastItem.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        var bottomOffset = 20;
        if( pageOffset > lastItemOffset - bottomOffset ) this.loadUsers();
    }

    loadUsers = () => {
        const { currentPage, perPage, users, query } = this.state
        const ACCESS_KEY = "FIgbdnF-n60hzIXHRbJJe3f0a2C-ryxyZLjCY2t09m4";
        const URL = `https://api.unsplash.com/search/users?client_id=${ACCESS_KEY}&page=${currentPage}&query=${query}&per_page=${perPage}`;
        
        if(this.cancel) {
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();
        axios.get(URL, {
            cancelToken: this.cancel.token
        }).then((response) => {
            this.setState({
                ...this.state,
                users: [...users, ...response.data.results],
                totalPages: response.data.total_pages,
                currentPage: currentPage,
                message: ""
            });
        }).catch((error) => {
            if(axios.isCancel(error) || error) {
                this.setState({
                    ...this.state,
                    message: "Failed to fetch the data. Please check network"
                });
            }
        });
    }

    handleLoadMore = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {
                ...prevState,
                currentPage: prevState.currentPage + 1
            };
        }, this.loadUsers);
    }
    

    handleInputChange = (e) => {
        this.setState({
            ...this.state,
            users: [],
            currentPage: 1,
            perPage: 10,
            totalPages: 0,
            scrolling: false,
            query: e.target.value
        }, () => {
            this.loadUsers();
        });
    }

    render() {
        const { users, query } = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <form>
                            <div className="form-group">
                                <label htmlFor="search-input">Search Users</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="search-input"
                                    value={query}
                                    onChange={this.handleInputChange}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                <div className="col-sm-12 cards">
                {
                    users.map((user, index) => (
                        <div key={`${user.username}-${index}`} className="card" style={{ marginBottom: "10px"  }}>
                            <h5 className="card-header">{user.name} -- {index}</h5>
                            <div className="card-body">
                                <img alt="img" src={user.profile_image.medium} />
                            </div>
                        </div>
                    ))
                }
                </div>
                {/* <a href="!#" onClick={this.handleLoadMore}>Load More</a> */}
                </div>
            </div>
        );
    }
};

export default ContactPage;