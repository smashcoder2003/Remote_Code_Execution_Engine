import Login from "./Components/Login/Login";
import NavBar from "./Components/NavBar/NavBar";
import { createContext, useState, useEffect } from "react";
import './index.css';
import Assignments from "./Components/Assignments/Assignments";
import CodeGround from "./Components/CodeGround/CodeGround";
import axios from 'axios';
import { Route, Routes } from "react-router-dom";

// Ensures Cookies are sent
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn]  = useState(() => null);
    const [user, setUser] = useState(() => null);

    const checkLoginState = () => {
        (async () => {
            try {
            const { data: { signedIn: signedIn, user: userName }  } = await axios.get(`/api/logged_in`);
               signedIn && setLoggedIn(signedIn);
               userName && setUser(userName);
            } catch (err) {
                console.log(err);
            }
        })();
    }

    useEffect(() => {

        checkLoginState();
    }, [loggedIn, checkLoginState]);

    return (
        <AuthContext.Provider value={ { loggedIn, setLoggedIn, setUser, checkLoginState, user } }>
            {children}
        </AuthContext.Provider>
    );
}


function App() {
    const [clickedSignUp, setSignUp] = useState(() => false);
    const [clickedAssignments, setAssignments] = useState(() => false);
    return (
        <>
            <AuthContextProvider>
                <NavBar handleSignUp={setSignUp} handleAssignments={setAssignments} />
                <Routes>
                    <Route path={'/assignments'}  element={ <Assignments clicked={clickedAssignments}/> } />
                    <Route path={'/signIn'}  element={ <Login signingUp={ clickedSignUp} /> } />
                    <Route path={'/code_ground/:qid'} element={ <CodeGround /> } />
                </Routes>
            </AuthContextProvider>
        </>
    );
}

export default App;
