import React from 'react';

const SearchPagination = ({ loading, handlePrevClick, handleNextClick, showPrevLink, showNextLink }) => {
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