import React from "react";
import "../styles/index.css";
import "../styles/book.css";

const selectedBook = (props) => {
    return(<>
        <div className="book-container">
        {props.cover === undefined ? <img src={`/images/INF.png`} className="book-cover" alt="Cover"/> : <img src={`/images/${props.cover}`} className="book-cover" alt="Cover"/>}
        <span className="book-title">{props.title}</span>
        <div className="book-filter-container">
            <span className="book-filter">{props.genre}</span>
            <span className="book-filter">{props.yearPublished}</span>
            <span className="book-filter">{props.pageCount} p.</span>
        </div>
        <button className="close-book" onClick={props.closeBook}>Close</button>
    </div>
    </>);
}

export default selectedBook;