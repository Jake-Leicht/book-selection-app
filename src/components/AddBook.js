import { addDoc, collection } from "firebase/firestore";
import React, {useState} from "react";
import { db } from "../utils/firebase-config";
import "../styles/modal.css";
import "../styles/index.css";

const AddBook = () => {
    const firebaseCollection = collection(db, "book-collection");

    const [bookTitle, setBookTitle] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookYear, setBookYear] = useState("");
    const [bookPageCount, setBookPageCount] = useState("");
    const [bookGenre, setBookGenre] = useState("");

    const createBook = async (event) => {
        await addDoc(firebaseCollection, {
            title: event.target[0].value,
            author: event.target[1].value,
            cover: "",
            yearPublished: event.target[2].value,
            pageCount: event.target[3].value,
            genre: event.target[4].value
        });
    }

    const testInputs = (event) => {
        event.preventDefault();

        Array.prototype.forEach.call(event.target.elements, (elem) => {
            if(elem.id !== "submit-btn"){
                if(elem.value === ""){
                    console.log("failed");
                    return false;
                }
            }
        });
        createBook(event);
        resetInputs();
    }

    const resetInputs = () => {
        setBookTitle("");
        setBookAuthor("");
        setBookYear("");
        setBookPageCount("");
        setBookGenre("");
    }

    return(<>
    <p className="addBook-title">Enter Book Info</p>
        <form onSubmit={testInputs}>
            <label>
                <input className="modal-addBook-input" type="text" value={bookTitle}
                onChange={(event) => setBookTitle(event.target.value)} placeholder="Title..."></input>
            </label>
            <label>
                <input className="modal-addBook-input" type="text" value={bookAuthor} 
                onChange={(event) => setBookAuthor(event.target.value)} placeholder="Author..."></input>
            </label>
            <label>
                <input className="modal-addBook-input" type="number" value={bookYear} 
                onChange={(event) => setBookYear(event.target.value)} placeholder="Year Published..."></input>
            </label>
            <label>
                <input className="modal-addBook-input" type="number" value={bookPageCount} 
                onChange={(event) => setBookPageCount(event.target.value)} placeholder="Page Count..."></input>
            </label>
            <label>
                <input className="modal-addBook-input" type="text" value={bookGenre} 
                onChange={(event) => setBookGenre(event.target.value)} placeholder="Genre..."></input>
            </label>
            <button className="addBook-btn" id="submit-btn" type="submit">Add Book</button>
        </form>
    </>)
}

export default AddBook;