import axios from 'axios';
import {useContext, useEffect} from "react";
import { AuthContext } from '../../App';
// import {logger} from 'log-please';

export default function Login({ signingUp }) {

    const { loggedIn, setLoggedIn, setUser, checkLoginState }  = useContext(AuthContext);


    function handleLogin() {
        const user = document.getElementById("email").value;
        const pass = document.getElementById("password").value;
        let result;
        (async () => {
            //
             result = await axios.post(`http://localhost:2000/api/login`, {
                userName: user,
                password: pass
            }, { headers: { 'Content-Type': 'Application/json' }});
             // Added log of result data
            if (result.data["loggedIn"]) {
                // Check whether loggedIn is actually updating
                await axios.get('http://localhost:2000/database/generate_assignments');
                setLoggedIn(true);
                setUser(result.data.user);
                checkLoginState();
            }
        })();
    }

    if (signingUp && loggedIn) {
        return(
            <div className="text-2xl">You are logged In.</div>
        );
    }

    if (signingUp && !loggedIn) {
        return (
            <>
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6">
                            <div>
                                <label form="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input id="email" name="email" type="name" autoComplete="email" required className="block  px-1.5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label form="password" className="block px-1 text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <div className="text-sm">
                                        <div  className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>

                            <div>
                                <button onClick={handleLogin} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}