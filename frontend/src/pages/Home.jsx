import '../App.css'
import { useState, useEffect, useRef } from 'react'
import InterviewSetup from '../components/InterviewSetup';
import RightPanels from '../components/RightPanels';
import Unauthorized from '../components/registration/Unauthorized';
import Loading from '../components/Loading';

const Home = () => {
    const [hasSignedUp, setHasSignedUp] = useState(false)
    const [userName, setUserName] = useState('')
    const [registeringUser, setRegisteringUser] = useState(false)
    const [authenticatingUser, setAuthenticatingUser] = useState(false)

    const hasMounted = useRef(false);
    const userId = JSON.parse(localStorage.getItem('userId'))
    const [validUser, setValidUser] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        const getUserInfo = async () => {
            const requestBody = {
                "user_id": userId
            }
            try {
                const response = await fetch('http://127.0.0.1:5000/users/info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                if (response.ok) {
                    const data = await response.json();
                    if(data) {
                        setUserInfo(data)
                        setAuthenticatingUser(false);
                    }
                } else {
                    console.error('Request failed with status:', response.status);
                }
            } catch (error) {
                console.error('Fetch request error:', error);
            }
        }

        if (!hasMounted.current) {
            if (userId === null) {
                setValidUser(false)
            }
            else {
                setValidUser(true)
                setAuthenticatingUser(true)
                getUserInfo()
            }
            hasMounted.current = true
        }

    }, [hasMounted, setValidUser, validUser, userId])

    const handleUserChange = (e) => {
        setUserName(e.target.value);
    };

    const registerUser = () => {
        const requestBody = {
            "name": userName
        }
        setHasSignedUp(true)
        setRegisteringUser(true)
        try {
            fetch('https://conduify-production.up.railway.app/users/home_registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        console.error('Request failed with status:', response.status);
                    }
                })
                .then(data => {
                    if (data) {
                        setRegisteringUser(false)
                    }
                })
                .catch(error => {
                    console.error('Request failed:', error);
                });
        }
        catch (error) {
            console.error('Fetch request error:', error);
        }
    }

    if (validUser) {
        return (
            <>
                {authenticatingUser ? (<Loading />) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="bg-gray-100 rounded-full flex items-center justify-center h-screen">
                            <div className="bg-white p-8 rounded-3xl shadow-lg">
                                {hasSignedUp ? (
                                    <InterviewSetup userName={userName} loadingUser={registeringUser} />
                                ) : (
                                    <div>
                                        <div className=''>
                                            <img src='/interviewify.svg' alt='Logo' className='h-36' />
                                        </div>

                                        <h1 className='text-2xl font-semibold text-zinc-600'>
                                            Build Incredible Things. Forge Powerful Connections.
                                        </h1>
                                        <p className='mb-3 text-gray-400'><code>Enter your name to get started below.</code></p>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={userName}
                                            onChange={handleUserChange}
                                            placeholder="Awesome Name"

                                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500 transition"
                                        />
                                        <button
                                            type="submit"
                                            className="mt-1 bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition duration-300"
                                            onClick={() => {
                                                registerUser()
                                            }}
                                        >Setup My Interview</button>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div>
                            <RightPanels userInfo={userInfo} />
                        </div>
                    </div>
                )}
            </>

        )
    }
    else {
        return (
            <Unauthorized />
        )
    }
}

export default Home