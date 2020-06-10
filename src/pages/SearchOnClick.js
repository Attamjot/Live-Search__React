import React from 'react';
import axios from 'axios';
import Loader from '../loader.gif';
import Pagination from '../components/Pagination';

class SearchOnClick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: {},
            loading: false,
            message: "",
            totalResults: 0,
            totalPages: 0,
            currentPage: 0
        }
    }

    getPageCount = (totalResults, resultsPerPage) => {
        const divisible = 0 === totalResults % resultsPerPage;
        const valueToBeAdded = divisible ? 0 : 1;
        return Math.floor(totalResults / resultsPerPage) + valueToBeAdded;
    }

    handleInputChange = (event) => {
      const query = event.target.value;
      this.setState({
         ...this.state,
         query: query,
         loading: false
      });
    }

    handleInputSearch = (event) => {
        event.preventDefault();
        const { query } = this.state;
        if(!query) {
            this.setState({
                ...this.state,
                query: query,
                results: {},
                loading: false,
                message: "Please type a query to search..",
                totalResults: 0
            });
        } else {
            this.setState({
                ...this.state,
                query: query,
                loading: true,
            }, () => {
                setTimeout(() => {
                    this.fetchSearchResults(1, query);
                }, 500);
            });
        }
    }

    fetchSearchResults = async (updatedPageNo, query) => {
        const pageNumber= updatedPageNo ? `&page=${updatedPageNo}` : "";
        const searchURL = `https://pixabay.com/api/?key=16895702-fea5388627972a86478f336ef&q=${query}${pageNumber}`;
        const response = await axios.get(searchURL);

        const total = response.data.total;
        const totalPageCount = this.getPageCount(total, 20);
        const resultNotFoundMsg = !response.data.hits.length ? 
                                "There are no more search results. Please try a new search." : "";
        this.setState({
            ...this.state,
            query: query,
            results: response.data.hits,
            loading: false,
            message: resultNotFoundMsg,
            totalResults: total,
            totalPages: totalPageCount,
            currentPage: resultNotFoundMsg ? 0 : updatedPageNo
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
                                        alt={`${result.user} images`} />
                                </div>
                            </a>
                        ))
                    }
                </div>
            );
        }
    }

    handlePageClick = (event, type, pageNumber) => {
        const { currentPage, loading, query } = this.state;
        event.preventDefault();
        let updatePage = 1; // default to 1 page
    
        if(type) {
          updatePage = "prev" === type ? currentPage - 1 : currentPage + 1;
        } else {
          updatePage = pageNumber;
        }
        
        /* User can click the next/ prev button also before the fetchResults is happening, so at that time we cannot get prev/ next results . So to check the loading property can help us.  */
        if ( !loading ) {
            this.setState({
                ...this.state,
                loading : true,
                message: ""
            }, () => {
               this.fetchSearchResults(updatePage, query);
            })
        }
      }

    render() {
        const { query, loading, message, currentPage, totalPages } = this.state
        const showPrevLink = currentPage > 1;
        const showNextLink = totalPages > currentPage;

        return (
            <div className="container search-page">
                <h1>Live Search with Pagination</h1>
                <form>
                    <label className="search-label" htmlFor="search-input">
                        <input type="text" id="search-input" value={query} onChange={this.handleInputChange}/>
                    </label>
                    <button 
                        className="btn btn-primary btn-lg"
                        style={{ marginLeft: 10}}
                        onClick={this.handleInputSearch}>Search</button>
                </form>

                {  message && <h2>{message}</h2> }
                <img alt="loading-bar" src={Loader} className={`search-loading ${loading ? "show" : "hide"}`}/>

                <Pagination 
                    loading = {loading}
                    showPrevLink = {showPrevLink}
                    showNextLink = {showNextLink}
                    totalPages = {totalPages}
                    currentPage = {currentPage}
                    handlePageClick = {(event, type, pageNumber) => this.handlePageClick(event, type, pageNumber)}
                />
                {this.renderSearchResults()}
                
            </div>
        )
    }
}

export default SearchOnClick;