import {useState} from "react";
import Login from "../Login/Login";
import Problems from "../Problems/Problems";
import './NavBar.css';
export default function NavBar() {
    const [click, setClick] = useState(false);
    const [problemsClicked, setProblemsClicked] = useState(false);
    const login = click ? <Login/> : <div></div>;
    const problems = problemsClicked? <Problems/>: <div></div>;



    function handleClick() {
        setClick(true);
        setProblemsClicked(false);
    }

    function handleProblemsClick() {
        setClick(false);
        setProblemsClicked(true);
    }

    return (
        <>
        <nav>
            <div className="parent">
                <div className="Items">

                    <div className="Item1">
                        <svg className="logo" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"></path></svg>
                    </div>
                    <div className="Item2">
                        <div className="subItem1 text-5xl" > Home </div>

                        <div className="subItem2" onClick={handleProblemsClick}> Problems</div>

                        <div className="subItem3" onClick={handleClick}>Signup</div>
                    </div>
                    <div className="Item3">
                            <svg className="logo hover:bg-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
                    </div>
                </div>
            </div>
        </nav>
        {login}
        {problems}
        </>
    );
}