import React from 'react';

const Pagination  = ({ totalPages, currentPage, loading, showPrevLink, showNextLink, handlePageClick }) => {
    const pageLinks = [];
    
    for(let i= 1; i <= totalPages; i++) {
        let active = currentPage === i ? "active" : "";
        pageLinks.push(<li className={`page-item ${active}`} key={i} onClick={(event) => handlePageClick(event, null, i)}> <a className="page-link" href="!#">{i}</a> </li>);
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
                        href="!#"
                        onClick={(event) => handlePageClick(event, "prev", null)}
                        >Previous</a>
                </li>

                { pageLinks }
                
                <li className={`
                                page-item 
                                ${showNextLink ? "show" : "hide"}
                                ${loading ? "disabled": ""}
                              `}>
                    <a 
                        className="page-link"
                        href="!#"
                        onClick={(event) => handlePageClick(event, "next", null)}>Next</a>
                </li>

        </ul>
    </div>
  )
};

export default Pagination;