import AceEditor from "react-ace";
import React from "react";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-r";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function CodeGround({SignUp, Assignments}) {
    return (
        <>
            <div className="flex flex-col sm:flex-row gap-x-7 m-4 ">
                <QuestionFrame />
                <div className= "flex flex-col gap-y-0.5 mt-1.5 w-[100%] sm:w-[50%] items-center">

                    <div className="flex items-center w-[100%] justify-center font-thin font-sans gap-x-0.5 m-0.5 text-gray-900 rounded-xl border border-gray-500 dark:bg-gray-600 dark:text-white p-1 scroll-m-0.5">
                        Code
                    </div>

                    <div className= "m-2 w-[100%]">
                        <CodeEditor/>
                    </div>

                    <div className= "flex flex-row gap-x-3 items-center justify-center">
                        <div className="submit font-mono bg-gray-300 text-black dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 hover:text-white hover:cursor-pointer hover:bg-gray-600 rounded-3xl m-2 p-2">
                            <a href="#">Submit</a>
                        </div>

                        <div className="submit font-mono bg-gray-300 text-black dark:text-white dark:textwhite dark:bg-gray-600 dark:hover:bg-gray-700 hover:text-white hover:cursor-pointer hover:bg-gray-600 rounded-3xl m-1 p-2">
                            <a href="#">Run</a>
                        </div>
                    </div>

                    <div className="flex flex-col testCases bg-white text-black dark:bg-gray-600 dark:text-white w-[100%] border border-gray-900 rounded-md">
                        <div className="header flex flex-row items-center justify-center border-b-2">
                            <svg className="w-4 h-4 m-2 fill-current text-blue-600 dark:group-hover:text-blue-600 hover:text-blue-600 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2zM5 5h2v2h10V5h2v15H5V5z"></path><path d="m11 13.586-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414z"/>
                            </svg>
                            <p className="font-mono text-black dark:text-gray-200">TestCases</p>
                        </div>
                        <div className= "flex flex-col w-[100%] m-2 dark:text-white text-black font-mono">
                            <p>Tests Passed: 10</p>
                            <p> Total Tests: 20</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}


function QuestionFrame() {
    // Fetch the data with qid
    return (
        <>
            <div className="bg-white dark:bg-gray-600 dark:text-white flex flex-col rounded-t-xl m-1.5s gap-y-3  w-[100%] sm:w-[50%] border border-gray-500 overflow-y-auto overflow-x-auto max-h-[750px] shadow-xl">
                <div className="title bg-white dark:bg-gray-600 sticky top-0 flex flex-row gap-x-1.5 border rounded-t-xl border-white dark:border-gray-600 border-b-gray-500 dark:border-b-gray-500 h-[100%]">
                    <div className="flex flex-row items-center justify-center font-thin font-sans gap-x-0.5 m-0.5 hover:rounded-[5px] p-1 scroll-m-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="4em" height="4em" fill="currentColor" className="h-3.5 w-3.5 flex-none fill-none stroke-blue-700 stroke-1.5 text-blue-60 dark:text-blue-60">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.9 4.2h4.2M4.9 6.3h4.2M4.9 8.4H7m-3.15-7h6.3a1.4 1.4 0 011.4 1.4v8.4a1.4 1.4 0 01-1.4 1.4h-6.3a1.4 1.4 0 01-1.4-1.4V2.8a1.4 1.4 0 011.4-1.4z"/>
                        </svg>
                        Description
                    </div>
                </div>

                <div>
                    <div className="statementheader m-1 font-mono text-xl">
                        This is the problem statement Title which is very huge indeed !!.
                    </div>

                    <div className="m-1">
                        This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve.
                        This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve.
                        This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve. This is the problem statement Description,
                        The description is very long and tiring to read.
                        But fun to solve.
                    </div>

                </div>
            </div>
        </>
    )
}

function CodeEditor() {
   return (
       <>
           <AceEditor
                   mode="r"
                   theme="monokai"
                   name="AceEditor"
                   editorProps={{ $blockScrolling: true}}
                   fontSize= {13}
                   width={"100%"}
                   height={"500px"}
                   value={"def func():\n    # Write your code here"}
                   style={{borderRadius: "7px"}}
           />
       </>
   )
}
export default CodeGround;