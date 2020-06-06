import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../loader.gif';
import SearchPagination from '../components/SearchPagination';

class SearchPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
          query: "", // live query
          results: {},  // will store the results in this key
          loading: false,  // for loading status
          message: "",  // Incase if we get a message , we will store in this variable
          totalResults: 0,
          totalPages: 0,
          currentPage: 0
      };
      this.cancel = "";
  }
  /*
    @Params:
        total = totalResultCount
        denominator = How many items you want to show perPage.
    @ How it works: 
      Case 1:   Suppose totalResultCount = 61;
                denomiator = 20,
        then 61 / 20 , will give us a remaninder of 1.
        So it means we have to show 4 pages i.e first three pages with 20 results and last page with one Result.
        Hope now it makes sense.
      Case 2 : 
                Suppose totalResultCount = 60;
                denomiator = 20,
        then 60 / 20 , will give us a remaninder of 0.
        So it means we have to show 3 pages i.e three pages with 20 results each.
        Hope now it makes sense.
  */
  getPageCount = ( total, denominator ) => {
    const divisible = 0 === total % denominator;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  }

  handleOnInputChange = (event) => {
    const query = event.target.value;
    if(!query) {
        this.setState({
            ...this.state,
            results: {},
            query: query,
            message: "",
            currentPage: 0,
            totalPages: 0,
            totalResults: 0
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
        const total = response.data.total;
        const totalPagesCount = this.getPageCount(total, 20);
        const resultNotFoundMsg = !response.data.hits.length ? 
                                "There are no more search results. Please try a new search." : "";
        this.setState({
            ...this.state,
            results: response.data.hits,
            loading: false,
            message: resultNotFoundMsg,
            totalResults: total,
            totalPages: totalPagesCount,
            currentPage: resultNotFoundMsg ? 0 : updatedPageNo
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
   /* Handling Pagination ( Prev, Next Click Handler ) */
  handlePageClick = (event, type) => {
    const { currentPage, loading, query } = this.state;
    event.preventDefault();
    const updatePage = "prev" === type ? currentPage - 1 : currentPage + 1;

    /* User can click the next/ prev button also before the fetchResults is happening, so at that time we cannot get prev/ next results . So to check the loading property can help us.  */
    if ( !loading ) {
        this.setState({
            ...this.state,
            loading : true,
            message: ""
        }, () => {
            setTimeout(() => {
                this.fetchSearchResults(updatePage, query);
            }, 1000);
        })
    } 
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
      const { query, loading, message, currentPage, totalPages } = this.state;
      const showPrevLink = currentPage > 1; /* Can only show Previous Button, only if the currentPage > 1 */
      const showNextLink = totalPages > currentPage; /* Can only show the Next Button , if totalPages > currentPage. Suppose we have 100 pages and the person is at 99, then only show the next Button otherwise not. */

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
            <h4>CurrentPage: {currentPage}</h4>
             <SearchPagination 
                loading = {loading}
                handlePrevClick = {(event) => this.handlePageClick(event, "prev")}
                handleNextClick = {(event) => this.handlePageClick(event, "next")}
                showPrevLink = {showPrevLink}
                showNextLink = {showNextLink}            
            />
             {/* Results */}
             {this.renderSearchResults()}
         </div>
      )
  }
}


export default SearchPage;