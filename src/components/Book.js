import React from "react";
import "../styles/index.css";
import "../styles/book.css";

const Book = (props) => {
    const imagesFolder = require.context("../../public/images", true);

    if((props.title).toLowerCase().includes(props.searchFilter.toLowerCase())){
        return(<div className="book-container" onClick={() => props.selectedBook({
            id: props.id,
            key: props.id,
            title: props.title,
            author: props.author,
            cover: props.cover,
            yearPublished: props.yearPublished,
            pageCount: props.pageCount,
            genre: props.genre})}>
        {props.cover === undefined ? <img src={imagesFolder(`./INF.png`)} className="book-cover" alt="Cover"/> : <img src={imagesFolder(`./${props.cover}`)} className="book-cover" alt="Cover"/>}
        <span className="book-title">{props.title}</span>
        <div className="book-filter-container">
            <span className="book-filter">{props.genre}</span>
            <span className="book-filter">{props.yearPublished}</span>
            <span className="book-filter">{props.pageCount} p.</span>
        </div>
    </div>);
    }
}

export default Book;