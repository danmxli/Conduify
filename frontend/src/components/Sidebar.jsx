import { BsPhoneFlip } from 'react-icons/bs'
import { FaUserAstronaut } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const Sidebar = ({ open, toggleSidebar, companyData, sessionData }) => {
    const navigate = useNavigate()

    const clearSessions = () => {
        const requestBody = {
            "username": companyData.interviewee
        }
        console.log(requestBody)
        try {
            fetch('https://conduify-production.up.railway.app/clear_user_companyinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
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
                        console.log('Successful response:', data);
                        window.location.reload();
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
        <div className={`${open ? 'w-1/3 sm:w-150' : 'w-10'} bg-white border-r border-gray-300 duration-700`}>
            <div className="overflow-scroll sm:overflow-clip">
                {companyData && (
                    <div className="h-screen overflow-scroll scrollbar-hide">
                        <div className="inline-flex bg-gray-100 border border-gray-300 sm:pr-4 rounded-r-3xl">
                            <BsPhoneFlip
                                className={`rounded-md mt-1 text-4xl duration-700 cursor-pointer ${open && 'rotate-[540deg]'
                                    }`}
                                onClick={() => toggleSidebar(!open)}
                            />
                        </div>
                        {
                            open ? (<>
                                <motion.h2
                                    initial={{ opacity: 0, x: -300 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.75,
                                        duration: 0.95,
                                        ease: [0.165, 0.84, 0.44, 1],
                                    }}
                                    className={`wrap-words text-xs sm:text-xl font-semibold pl-2 mr-2 mb-2 rounded-r-xl border`}>
                                    Information for: {companyData.interviewee}
                                </motion.h2>
                                <motion.div
                                    initial={{ opacity: 0, x: -300 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.75,
                                        duration: 0.95,
                                        ease: [0.165, 0.84, 0.44, 1],
                                    }}
                                >
                                    <div className='p-1 bg-gray-600 text-white inline-flex rounded-r-xl sm:rounded-t-xl mr-2 text-xs sm:text-base'>
                                        Your Progress
                                    </div>
                                    <button
                                        className='text-white bg-indigo-500 hover:bg-indigo-600 transition duration-300 p-1 rounded-r-xl sm:rounded-t-xl text-xs sm:text-base'
                                        type='submit'
                                        onClick={() => {
                                            window.location.reload()
                                        }}
                                    >
                                        Reload Interview
                                    </button>
                                    <button
                                        className='sm:ml-2 text-white bg-indigo-500 hover:bg-indigo-600 transition duration-300 p-1 rounded-r-xl sm:rounded-t-xl text-xs sm:text-base'
                                        type='submit'
                                        onClick={() => {
                                            navigate("/home");
                                        }}
                                    >
                                        Start New Interview
                                    </button>
                                    <button
                                        className='sm:ml-2 mb-2 sm:mb-0 text-white bg-indigo-500 hover:bg-indigo-600 transition duration-300 p-1 rounded-r-xl sm:rounded-t-xl text-xs sm:text-base'
                                        type='submit'
                                        onClick={() => {
                                            clearSessions()
                                        }}
                                    >
                                        Clear Other Sessions
                                    </button>

                                    <div className='mr-2 p-2 bg-gray-100 border border-gray-300 mb-2 rounded-r-3xl max-h-48 overflow-scroll scrollbar-hide'>
                                        {sessionData.map((item, index) => (
                                            <div key={index} className={`inline-grid bg-gray-500 text-white p-1 rounded text-xs sm:text-base m-1 ${index === sessionData.length - 1 ? 'bg-indigo-700' : ''}`}>
                                                <p>{item.company_name}</p>
                                                <p className='text-gray-100 text-sm'>{item.position}</p>
                                                {Array.isArray(item.languages) ? (
                                                    <p className='text-gray-200 text-xs'>{item.languages.join(', ')}</p>
                                                ) : (
                                                    <p className='text-gray-200 text-xs'>Languages not specified</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <ul className={`bg-gray-50 border border-gray-300 rounded-r-3xl mr-2 mb-2 p-2 ${open ? '' : 'hidden'} duration-100 text-sm sm:text-base break-words`}>
                                        <li>
                                            <strong>Description:</strong> {companyData.description}
                                        </li>
                                    </ul>
                                    <div className='max-h-96 overflow-scroll scrollbar-hide pb-2'>

                                        <ul className={`bg-gray-50 border border-gray-300 rounded-r-3xl p-2 mr-2 ${open ? '' : 'hidden'} duration-100 text-sm sm:text-base break-words`}>
                                            <li><strong><FaUserAstronaut /></strong> {companyData.question}</li>
                                        </ul>
                                    </div>
                                </motion.div>
                            </>) : (<></>)
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;