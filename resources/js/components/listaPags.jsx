import React from 'react'

const ListPagination = ({postPerPage, totalPost, paginate}) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPost/postPerPage); i++) {
        pageNumbers.push(i)        
    }
    return(
        <nav className="paginacion">
            <ul className="lista-pags">
                {pageNumbers.map(number=>(
                    <li key={number} className="lista-item">
                        <a onClick={() => paginate(number)} href="#" className="lista-link item-link">{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default ListPagination