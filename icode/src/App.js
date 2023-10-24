import Login from "./Components/Login/Login";
import NavBar from "./Components/NavBar/NavBar";
import {createContext, useState, useEffect, useContext} from "react";
import './index.css';
import Assignments from "./Components/Assignments/Assignments";
import CodeGround from "./Components/CodeGround/CodeGround";
import axios from 'axios';

// Ensures Cookies are sent
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn]  = useState(() => null);
    const [user, setUser] = useState(() => null);

    const checkLoginState = () => {
        (async () => {
            try {
                const { signedIn, userName } = await axios.get(`/api/logged_in`);
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
        <AuthContext.Provider value={ [loggedIn, setLoggedIn, user, checkLoginState] }>
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
                <Assignments clicked={clickedAssignments} />
                <Login signingUp={clickedSignUp} />
                {/*<CodeGround />*/}
            </AuthContextProvider>
        </>
    );
}

export default App;
