import { motion } from "framer-motion"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const SignIn = ({ name, updateName, password, updatePassword, updatePhase, updateUserData }) => {
    const navigate = useNavigate()
    const [isFetchingUsers, setIsFetchingUsers] = useState(false)
    const [userNotFound, setUserNotFound] = useState(false)

    const handleUserChange = (e) => {
        updateName(e.target.value);
    };
    const handleUpdatePassword = (e) => {
        updatePassword(e.target.value)
    }
    const verifyUser = () => {
        const requestBody = {
            username: name,
            password: password,
        }
        setIsFetchingUsers(true)
        try {
            fetch('http://127.0.0.1:5000/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.error('Request failed with status:', response.status);
                    }
                })
                .then(data => {
                    console.log(data['username'])
                    if(data['username'] === 'not_found') {
                        setUserNotFound(true)
                    }
                    else {
                        setUserNotFound(false)
                        updateUserData(data)
                        navigate('/home')
                    }
                    setIsFetchingUsers(false)
                })
                .catch(error => {
                    console.error('Request failed:', error);
                });
        }
        catch (error) {
            console.error('Fetch request error:', error)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.15,
                duration: 0.55,
                ease: [0.165, 0.84, 0.44, 1],
            }}
            className="bg-white p-8 rounded-xl max-w-3xl ml-4 mr-4 shadow-lg"
        >
            <h1 className='text-2xl font-semibold text-zinc-600'>
                Customized and powerful optimization for your coding journey.
            </h1>
            <p className='mb-3 text-gray-400'><code>Conduify is proud to serve a plethora of users.</code></p>
            <div className="grid grid-cols-3 gap-3 pb-3 items-center">
                <div className="col-span-1 font-semibold p-1 border rounded text-center">Your Username</div>
                <input
                    value={name}
                    onChange={handleUserChange}
                    className="col-span-2 border border-gray-400 ring-2 ring-gray-200 rounded focus:outline-none p-1
                "/>
            </div>
            <div className="grid grid-cols-3 gap-3 pb-3 items-center">
                <div className="col-span-1 font-semibold p-1 border rounded text-center">Your Password</div>
                <input
                    type="password"
                    value={password}
                    onChange={handleUpdatePassword}
                    className="col-span-2 border border-gray-400 ring-2 ring-gray-200 rounded focus:outline-none p-1
                "/>
            </div>
            <div className="inline-flex gap-3 mt-3">
                <button
                    className="bg-gray-950 text-white p-2 rounded"
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    Back to Conduify
                </button>
                <button
                    className="bg-gray-500 text-white p-2 rounded"
                    onClick={() => {
                        updatePhase('userSignUp')
                    }}
                >
                    New user? Sign Up
                </button>
                {name !== "" && password !== "" ? (
                    <button
                        className={`bg-indigo-500 text-white p-2 pl-20 pr-20 rounded`}
                        onClick={verifyUser}
                    >
                        {isFetchingUsers ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Next'}
                    </button>
                ) : (
                    <div className={`bg-indigo-300 text-white p-2 pl-20 pr-20 rounded`}>
                        Next
                    </div>
                )}

            </div>
            {userNotFound ? (
                <div className="mt-3 p-1 pl-2 pr-2 bg-orange-200 text-orange-700 inline-flex border rounded border-orange-300">
                    Incorrect combination of user details.
                </div>
            ) : (
                <></>)}
        </motion.div>
    )
}

export default SignIn