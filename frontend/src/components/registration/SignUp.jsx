import { motion } from "framer-motion"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const SignUp = ({ name, updateName, password, updatePassword, userType, updateUserType, updatePhase, updateUserData }) => {
    const navigate = useNavigate()
    const [pwdAgain, setPwdAgain] = useState("")
    const [isFetchingUsers, setIsFetchingUsers] = useState(false)
    const [isExistingUser, setIsExistingUser] = useState(false)

    const handleUserChange = (e) => {
        updateName(e.target.value);
    };
    const handleUpdatePassword = (e) => {
        updatePassword(e.target.value)
    }
    const handleConfirmPassword = (e) => {
        setPwdAgain(e.target.value)
    }
    const verifyUser = () => {
        const requestBody = {
            username: name,
            password: password,
            background: userType
        }
        setIsFetchingUsers(true)
        try {
            fetch('http://127.0.0.1:5000/users/signup', {
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
                    if (data['username'] === 'existing') {
                        setIsExistingUser(true)
                    }
                    else {
                        setIsExistingUser(false)
                        updateUserData(data)
                        localStorage.setItem('userId', JSON.stringify(data["_id"]))
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


    const buttonOptions = [
        "I am a general STEM enthusiast",
        "I am a software engineer candidate",
        "I am a data scientist candidate",
        "I am a quantitative analyst candidate",
        "I am a freelance fullstack developer"
    ];

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
            <div className="grid grid-cols-3 gap-3 items-center mb-3">
                <div className={`col-span-1 font-semibold p-1 border rounded text-center ${password !== "" && pwdAgain !== "" && password === pwdAgain ? "bg-green-200 text-green-700 border-green-300" : "bg-red-200 text-red-700 border-red-300"}`}>Password Confirmation</div>
                <input
                    type="password"
                    value={pwdAgain}
                    onChange={handleConfirmPassword}
                    className="col-span-2 border border-gray-400 ring-2 ring-gray-200 rounded focus:outline-none p-1
                "/>
            </div>
            <>
                <ul>
                    {buttonOptions.map((option, index) => (
                        <li key={index} className="m-2">
                            <button
                                className={`border p-2 rounded duration-200 ${userType === option ? 'border-indigo-500 ring-2 ring-indigo-200' : ''}`}
                                onClick={() => { updateUserType(option) }}
                            >
                                {option}
                            </button>
                        </li>
                    ))}
                </ul>
            </>
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
                        updatePhase('userSignIn')
                    }}
                >
                    Existing user? Sign in
                </button>
                {
                    name !== "" && password !== "" && pwdAgain !== "" && password === pwdAgain ? (
                        <button
                            className={`bg-indigo-500 text-white p-2 pl-20 pr-20 rounded`}
                            onClick={
                                verifyUser
                            }
                        >
                            {isFetchingUsers ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Next'}
                        </button>
                    ) : (
                        <div className={`bg-indigo-300 text-white p-2 pl-20 pr-20 rounded`}>
                            Next
                        </div>
                    )
                }

            </div>
            {isExistingUser ? (
                <div className="mt-3 p-1 pl-2 pr-2 bg-orange-200 text-orange-700 inline-flex border rounded border-orange-300">
                    Existing user found. Sign in instead.
                </div>
            ) : (
                <></>)}

        </motion.div>
    )
}

export default SignUp