import '../App.css'
import { useState } from 'react'
import InterviewSetup from '../components/InterviewSetup';
import DisplayAbout from '../components/DisplayAbout';

const Home = () => {
    const [hasSignedUp, setHasSignedUp] = useState(false)
    const [userName, setUserName] = useState('')
    const [registeringUser, setRegisteringUser] = useState(false)

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
            fetch('http://localhost:8001/users/home_registration', {
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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="bg-gray-100 rounded-full flex items-center justify-center h-screen">
                <div className="bg-white p-8 rounded-3xl shadow-lg">
                    {hasSignedUp ? (
                        <InterviewSetup userName={userName} loadingUser={registeringUser}/>
                    ) : (
                        <div>
                            <div className=''>
                                <img src='../../public/interviewify.svg' alt='Logo' className='h-36' />
                            </div>

                            <h1 className='text-2xl font-semibold text-zinc-600'>
                                Build Incredible Things. Forge Powerful Connections.
                            </h1>
                            <p className='mb-3 text-gray-400'><code>Enter your username to get started below.</code></p>
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
                <DisplayAbout />
            </div>
        </div>

    )
}

export default Home