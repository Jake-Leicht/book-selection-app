import React, {useEffect, useState} from "react";
import "./styles/index.css";
import "./styles/modal.css";
import Modal from "./components/Modal";
import BookContainer from "./components/BookContainer";
import GetInfo from "./components/GetInfo";

function App() {
  // * Initialize book collection
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let bookObjHolderArray = [];
    GetInfo().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let bookObjHolderTemp = {
          title: doc.data().title,
          author: doc.data().author,
          cover: doc.data().cover,
          yearPublished: doc.data().yearPublished,
          pageCount: doc.data().pageCount,
          genre: doc.data().genre,
          id: Math.random() * 1000
        };
        bookObjHolderArray.push(bookObjHolderTemp);
      });
      setBooks(bookObjHolderArray);
    }).catch((err) => {
      console.log(`Error: ${err}`);
    });
  }, []);

  // * Set inputs/filters
  const [inputGenre, setInputGenre] = useState("");
  const [genreCheck, setGenreCheck] = useState("");
  const [inputEra, setInputEra] = useState("");
  const [yearCheck, setYearCheck] = useState("");
  const [inputPageCount, setInputPageCount] = useState("");
  const [lengthCheck, setLengthCheck] = useState("");

  const [findBook, setFindBook] = useState(undefined);
  const [rand, setRand] = useState(undefined);

  const findBookHandler = () => {
    console.log("find book called");
    let rand = (Math.random(0) * (findBook - 1)).toFixed(0);
    setRand(rand);
  }

  useEffect(() => {
  }, [findBook]);

  const resetInputHandler = () => {
    setGenreCheck("");
    setYearCheck("");
    setLengthCheck("");
  }

  const [modal, setModal] = useState(false);
  if(modal === true){
    document.body.classList.add("disable-scroll");
  } else{
    document.body.classList.remove("disable-scroll");
  }
  
  return (
    <>
    <div className="header">
    <span>Let's find a new book to read</span>
    <Modal modal={modal} setModal={setModal}/>
  </div>
  <div id="filters" className="section">
      <span className="categories">
          <h2 className="title">What genre to read?</h2>
          <form className="form">
            <span>
              <input id="thriller-genre" type='radio' checked={genreCheck === "thriller"}
              name="genre" value="thriller" onChange={(event) => {setInputGenre(event.target.value); setGenreCheck(event.target.value)}}></input>
              <label htmlFor="thriller-genre">Thriller</label>
            </span>
            <span>
              <input id="mystery-genre" type='radio' checked={genreCheck === "mystery"}
              name="genre" value="mystery" onChange={(event) => {setInputGenre(event.target.value); setGenreCheck(event.target.value)}}></input>
              <label htmlFor="mystery-genre">Mystery</label>
            </span>
            <span>
              <input id="adventure-genre" type='radio' checked={genreCheck === "adventure"}
              name="genre" value="adventure" onChange={(event) => {setInputGenre(event.target.value); setGenreCheck(event.target.value)}}></input>
              <label htmlFor="adventure-genre">Adventure</label>
            </span>
          </form>
      </span>
      <span className="categories">
        <h2 className="title">What era you want to read from?</h2>
        <form className="form">
          <span>
            <input id="current-year" type='radio' checked={yearCheck === "current"}
            name="year" value="current" onChange={(event) => {setInputEra(event.target.value); setYearCheck(event.target.value)}}></input>
            <label htmlFor="current-year">Current (&gt;2000)</label>
          </span>
          <span>
            <input id="old-timey-year" type='radio' checked={yearCheck === "old-timey"}
            name="year" value="old-timey" onChange={(event) => {setInputEra(event.target.value); setYearCheck(event.target.value)}}></input>
            <label htmlFor="old-timey-year">Old-timey (pre-2000)</label>
          </span>
          <span>
            <input id="ancient-year" type='radio' checked={yearCheck === "ancient"}
            name="year" value="ancient" onChange={(event) => {setInputEra(event.target.value); setYearCheck(event.target.value)}}></input>
            <label htmlFor="ancient-year">Ancient (pre-1900)</label>
          </span>
        </form>
      </span>
      <span className="categories">
        <h2 className="title">How many pages are you looking to read?</h2>
        <form className="form">
          <span>
            <input id="short-length" type='radio' checked={lengthCheck === "short"}
            name="length" value="short" onChange={(event) => {setInputPageCount(event.target.value); setLengthCheck(event.target.value)}}></input>
            <label htmlFor="short-length">Short (&lt;150 pages)</label>
          </span>
          <span>
            <input id="average-length" type='radio' checked={lengthCheck === "average"}
            name="length" value="average" onChange={(event) => {setInputPageCount(event.target.value); setLengthCheck(event.target.value)}}></input>
            <label htmlFor="average-length">Average (&lt;400 pages)</label>
          </span>
          <span>
            <input id="long-length" type='radio' checked={lengthCheck === "long"}
            name="length" value="long" onChange={(event) => {setInputPageCount(event.target.value); setLengthCheck(event.target.value)}}></input>
            <label htmlFor="long-length">long (400+ pages)</label>
          </span>
        </form>
      </span>
    </div>
    <span className="section btn-container">
      <button className="submit-btn" type='submit' onClick={findBookHandler}>Let&#39;s read!</button>
      <button className="clear-btn" type="submit" onClick={resetInputHandler}>Clear Filters</button>
    </span>
    <BookContainer rand={rand} setFindBook={setFindBook} filterGenre={genreCheck} filterYear={yearCheck} filterLength={lengthCheck} books={books}/>
    </>
  );
}

export default App;
