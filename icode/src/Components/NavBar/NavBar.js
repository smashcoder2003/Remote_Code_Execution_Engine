import {AuthContext} from "../../App";
import { Link } from 'react-router-dom';
import { useContext } from "react";


export default function NavBar({ handleSignUp, handleAssignments }) {
    const { loggedIn } = useContext(AuthContext);
    function clickedSignUp() {
        handleSignUp(true);
        handleAssignments(false);
    }
    function clickedAssignments() {
        handleAssignments(true);
        handleSignUp(false);
    }
    return (
      <>
          <div className="border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white z-[5]">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                  <div onClick={clickedAssignments}>
                      <li className="mr-2">
                          <Link to={`/assignments`} className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group hover:text-blue-600 hover:border-blue-600">
                              <svg className="w-4 h-4 mr-2 text-gray-400 fill-current group-hover:text-blue-600 dark:group-hover:text-blue-600 hover:text-blue-600 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                  <path d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2zM5 5h2v2h10V5h2v15H5V5z"></path><path d="m11 13.586-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414z"/>
                              </svg>
                              Assignments
                          </Link>
                      </li>
                  </div>

                  <div onClick={clickedSignUp}>
                      <li className="mr-2">
                           <Link to={`/signIn`} className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-600 dark:hover:border-blue-600 group">
                              <svg className="w-4 h-4 mr-2 text-gray-400 fill-current group-hover:text-blue-600 dark:group-hover:text-blue-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                              </svg>
                              Sign In
                          </Link>
                      </li>
                  </div>
              </ul>
          </div>
      </>
    );
}
