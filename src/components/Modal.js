import React, {useState } from "react";
import "../styles/modal.css";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../utils/firebase-config";
import AddBook from "./AddBook";

const Modal = (props) => {
    const [signInFail, setSignInFail] = useState(false);

    const toggleModal = () => {
        props.setModal(!props.modal);
        setSignInFail(false);
        loginInputReset();
    }

    const loginInputReset = () => {
        setEmail("");
        setPassword("");
    } 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            setIsAdmin(true);
            loginInputReset();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setSignInFail(true);
        });
    };

    const signOutFirebase = () => {
        signOut(auth).then(() => {
            setIsAdmin(false);
            setSignInFail(false);
        }).catch((error) => {
            console.log(`Error: ${error}`);
        });
    }

    if(isAdmin === true){
        console.log("admin logged in");
        return(<>
            <button onClick={toggleModal} className={props.modal ? "hide-btn" : "generic-btn"}>Open</button>
            {props.modal && (
                <div id="modal" className={props.modal ? "active-modal" : ""}>
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <AddBook/>
                    <button className="login-btn" onClick={signOutFirebase}>Sign out</button>
                    <button className="login-btn close-modal" onClick={toggleModal}>Close</button>
                </div>
                </div>
            )}
        </>)
    } else{
        return(<>
            <button onClick={toggleModal} className={props.modal ? "hide-btn" : "generic-btn"}>Open</button>
            {props.modal && (
                <div id="modal" className={props.modal ? "active-modal" : ""}>
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                        <label>
                            <input className="modal-login-input" value = {email} onChange={(event) => setEmail(event.target.value)} placeholder="email..."></input>
                        </label>
                        <label>
                            <input className="modal-login-input" value = {password} onChange={(event) => setPassword(event.target.value)} placeholder="password..."></input>
                        </label>
                </div>
                    <button className="login-btn" onClick={signIn}>Login</button>
                    <button className="login-btn close-modal" onClick={toggleModal}>Close</button>
                    <p className={signInFail ? "error" : "hide"}>Error: failed login</p>
                </div>
            )}
        </>);
    }
}

export default Modal;