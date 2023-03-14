import React, {useState, useEffect, useRef} from "react";
import "../styles/index.css";
import "../styles/modal.css";
import Book from "./Book";
import SelectedBook from "./SelectedBook";


const BookContainer = (props) => {
    const [filterText, setFilterText] = useState("");

    const filterHandler = (event) => {
        setFilterText(event.target.value);
    }

    const [result, setResult] = useState([]);
    useEffect(() => {
        let resultTemp;
        resultTemp = filterGenreArray(props.books);
        resultTemp = filterYearArray(resultTemp);
        resultTemp = filterLengthArray(resultTemp);
        setResult(resultTemp);
        props.setFindBook(resultTemp.length);
    }, [props.filterGenre, props.filterYear, props.filterLength, props.books]);

    const filterGenreArray = (array) => {
        if(props.filterGenre !== ""){
            return array.filter((elem) => props.filterGenre === elem.genre);
        } else{
            return array;
        }
    }

    const filterYearArray = (array) => {
        if(props.filterYear !== ""){
            switch(props.filterYear){
                case "current": return array.filter((elem) => elem.yearPublished >= 2000);
                case "old-timey": return array.filter((elem) => elem.yearPublished < 2000 && elem.yearPublished >= 1900);
                case "ancient": return array.filter((elem) => elem.yearPublished < 1900);
                default: return array;
            }
        } else{
            return array;
        }
    }

    const filterLengthArray = (array) => {
        if(props.filterLength !== ""){
            switch(props.filterLength){
                case "short": return array.filter((elem) => elem.pageCount <= 150);
                case "average": return array.filter((elem) => elem.pageCount > 150 && elem.pageCount <= 400);
                case "long": return array.filter((elem) => elem.pageCount > 400);
                default: return array;
            }
        } else{
            return array;
        }
    }

    const [selectState, setSelectState] = useState({});

    useEffect(() => {}, []);

    const selectedBook = (obj) => {
        setSelectState(obj);
    }

    const closeBook = () => {
        setSelectState({});
    }

    useEffect(() => {
        if(props.rand !== undefined){
            selectRandBook(result, props.rand);
        }
    }, [props.rand]);

    const selectRandBook = (array, rand) => {
        let obj = array[rand];
        setSelectState(obj);
    }

    if(selectState.id === undefined){
        return(<>
        <div id="display" className="section">
            <input id='search-input' className="search-input" 
            type="search" placeholder="Search book by title..."
            value={filterText} onChange={filterHandler}></input>
            <div className="book-collection">
            {result.map((book) => (<Book selectedBook={selectedBook} key={book.id} id={book.id} title={book.title} author={book.author} cover={book.cover} yearPublished={book.yearPublished} pageCount={book.pageCount} genre={book.genre} searchFilter={filterText} filterGenre={props.filterGenre} filterYear={props.filterYear} filterLength={props.filterLength}/>))}
            </div>
        </div></>);
    } else{
        return(<>
        <div id="display" className="section">
            <input id='search-input' className="search-input" 
            type="search" placeholder="Search book by title..."
            value={filterText} onChange={filterHandler}></input>
            <div className="book-collection selectedBook">
                <SelectedBook closeBook={closeBook} key={selectState.id} id={selectState.id} title={selectState.title} author={selectState.author} cover={selectState.cover} yearPublished={selectState.yearPublished} pageCount={selectState.pageCount} genre={selectState.genre}/>
            </div>
        </div></>);
    }
}

export default BookContainer;