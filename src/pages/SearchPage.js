import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../loader.gif';

class SearchPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
          query: "", // live query
          results: {},  // will store the results in this key
          loading: false,  // for loading status
          message: ""  // Incase if we get a message , we will store in this variable
      };
      this.cancel = "";
  }

  handleOnInputChange = (event) => {
    const query = event.target.value;
    if(!query) {
        this.setState({
            ...this.state,
            results: {},
            query: query,
            message: ""
        });
    } else {
        this.setState({
            ...this.state,
            query: query,
            loading: true
        }, () => {
            this.fetchSearchResults(1, query);
        });
    }
  }

  fetchSearchResults = (updatedPageNo, query) => {
    const pageNumber= updatedPageNo ? `&page=${updatedPageNo}` : "";
    const searchUrl = `https://pixabay.com/api/?key=16895702-fea5388627972a86478f336ef&q=${query}${pageNumber}`;

    if(this.cancel) {
        this.cancel.cancel();
    }

    this.cancel = axios.CancelToken.source();
    axios.get( searchUrl , {
        cancelToken: this.cancel.token
    }).then((response) => {
        const resultNotFoundMsg = !response.data.hits.length ? 
                                "There are no more search results. Please try a new search." : "";
        this.setState({
            ...this.state,
            results: response.data.hits,
            loading: false,
            message: resultNotFoundMsg
        });
    }).catch((error) => {
        if(axios.isCancel(error) || error) {
            this.setState({
                ...this.state,
                loading: false,
                message: "Failed to fetch the data. Please check network"
            });
        }
    });
  }

  renderSearchResults = () => {
    const { results } = this.state;
    if(Object.keys(results).length && results.length) {
        return (
            <div className="results-container">
                {
                    results.map( result => (
                        <a key={result.id} href={result.previewURL} className="result-item">
                            <h6 className="image-username">{result.user}</h6>
                            <div className="image-wrapper">
                                <img
                                    className="image" 
                                    src={result.previewURL}
                                    alt={`${result.user} image`} />
                            </div>
                        </a>
                    ))
                }
            </div>
        );
    } 
  }

  render() {
      const { query, loading, message } = this.state;
      return (
         <div className="container search-page">
             <div className="heading">Live Search: React Application</div>
             <label type="text" className="search-label" htmlFor="search-input">
                <input 
                    type="text"
                    value={query}
                    id="search-input"
                    placeholder="Search..." 
                    onChange={ this.handleOnInputChange } />
                    <i className="fa fa-search search-icon" aria-hidden="true" />
             </label>

             {/* Error Message */}
              {
                    message &&  <p className="message">{ message }</p>
              }

             {/* Loader */}
                <img src={Loader} className={`search-loading ${loading ? "show" : "hide"}`}/>

             {/* Results */}
             {this.renderSearchResults()}
         </div>
      )
  }
}


export default SearchPage;