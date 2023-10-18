import Login from "./Components/Login/Login";
import NavBar from "./Components/NavBar/NavBar";
import {useState} from "react";
import './index.css';
import Assignments from "./Components/Assignments/Assignments";
import Editor from "./Components/Editor/Editor";
import VsEditor from "./Components/Editor/VsEditor";

function App() {
    const [clickedSignUp, setSignUp] = useState(() => false);
    const [clickedAssignments, setAssignments] = useState(() => false);
    return (
    <>
        <NavBar handleSignUp={setSignUp} handleAssignments={setAssignments}/>
        <Assignments clicked={clickedAssignments}/>
        <Login signingUp={clickedSignUp}/>
        {/*<VsEditor/>*/}
    </>
      );
}

export default App;
