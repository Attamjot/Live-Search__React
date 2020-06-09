import React from 'react';

const SearchPagination = ({ loading, handlePrevClick, handleNextClick, showPrevLink, showNextLink, totalPages, currentPage, handlePageNumber }) => {
    const pageLinks = [];
    
    for(let i= 1; i <= totalPages; i++) {
        let active = currentPage == i ? "active" : "";
        pageLinks.push(<li className={`page-item ${active}`} key={i} onClick={(event) => handlePageNumber(event, i)}> <a className="page-link" href="#">{i}</a> </li>);
    }

    return (
        <div className ="nav-link-container">
            <ul className="pagination">
                <li className={`
                                page-item
                                ${showPrevLink ? "show" : "hide"}
                                ${loading ? "disabled": "" }
                              `}>
                    <a 
                        className="page-link" 
                        href="#"
                        onClick={handlePrevClick}
                        >Previous</a>
                </li>
                {
                    pageLinks
                }
                <li className={`
                                page-item 
                                ${showNextLink ? "show" : "hide"}
                                ${loading ? "disabled": ""}
                              `}>
                    <a className="page-link" href="#" onClick={handleNextClick}>Next</a>
                </li>
            </ul>
        </div>
    );
}

export default SearchPagination;