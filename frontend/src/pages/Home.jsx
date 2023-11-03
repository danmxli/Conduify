import '../App.css'
import { useState, useEffect, useRef } from 'react'
import InterviewSetup from '../components/InterviewSetup';
import RightPanels from '../components/RightPanels';
import Unauthorized from '../components/registration/Unauthorized';
import Loading from '../components/Loading';

const Home = () => {
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
                const response = await fetch('https://conduify-production.up.railway.app/users/info', {
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

    if (validUser) {
        return (
            <>
                {authenticatingUser ? (<Loading />) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="bg-gray-100 rounded-full flex items-center justify-center h-screen">
                            <div className="bg-white p-8 rounded-3xl shadow-lg">
                                <InterviewSetup username={userInfo.username} />
                            </div>
                        </div>

                        <div>
                            <RightPanels username={userInfo.username} />
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