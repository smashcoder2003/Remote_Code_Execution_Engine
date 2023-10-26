import { AuthContext } from "../../App";
import {useContext,useEffect,useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


export default function Assignments({ clicked }) {
    const { loggedIn } =  useContext(AuthContext);
    const [elements, setElements] = useState(() => []);
    const [updatedElements, updateElements] = useState(() => false);


    (async () => {
        if (loggedIn && !updatedElements) {
            try {
                const result = await axios.get('http://localhost:2000/database/assignments');
                const qids = result.data["assignments"];
                const result2 = await axios.post('http://localhost:2000/database/questions', {
                      assignments: qids
                }, { headers: {'Content-Type': 'Application/json' } });


                const questions = result2.data["assignments"];

                // Updating Assignments
                if (questions) {
                    setElements(questions.map( assignment =>
                        <>
                            {/* Try sending the questions normally */}
                            <div key={assignment.qid} className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700 w-[95%]">
                                <Link  to={`/code_ground/${assignment.qid}`}> {/* Should go to the '/codeground/:qid' route */}
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{assignment.heading}</h5>
                                </Link>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{assignment.description}</p>
                                <Link  to={`/code_ground/${assignment.qid}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Open Assignment
                                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </Link>
                            </div>
                        </>)
                    );

                    updateElements(true);
                }


            } catch (err) {
                console.log(err);
            }
        }
    })();



    useEffect(() => {
    }, [loggedIn, updatedElements]);


    if (clicked && updatedElements) {
        return (
            <>
                <div className="flex flex-col gap-y-4 mt-1.5">
                    { elements }
                </div>
            </>
        );
    }


    if ( clicked ) {
        return (
            <> Loading... </>
        );
    }
}