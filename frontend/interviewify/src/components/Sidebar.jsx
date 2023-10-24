import React from 'react';
import { BsPhoneFlip } from 'react-icons/bs'
import { FaUserAstronaut } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, toggleSidebar, companyData, sessionData }) => {
    const navigate = useNavigate()

    return (
        <div className={`${open ? 'w-1/3 sm:w-150' : 'w-10'} bg-white border-r border-gray-300 duration-700`}>
            <div className="overflow-scroll sm:overflow-clip">
                {companyData && (
                    <div className="h-screen overflow-scroll scrollbar-hide">
                        <div className="inline-flex">
                            <BsPhoneFlip
                                className={`rounded-md mt-1 text-4xl duration-700 cursor-pointer hover:bg-indigo-200 ${open && 'rotate-[540deg]'
                                    }`}
                                onClick={() => toggleSidebar(!open)}
                            />
                            <h2 className={`text-xs sm:text-xl font-semibold ml-2 mt-3 sm:mt-2 ${open ? '' : 'hidden'} duration-100`}> Information</h2>
                        </div>

                        <div className={`${open ? '' : 'hidden'}`}>
                            <div className='p-2 bg-gray-300 inline-flex rounded-tr-xl mr-2'>
                                <strong>Your Progress</strong>
                            </div>

                            <div className='mr-2 p-2 bg-gray-100 border border-gray-300 mb-2 rounded-br-3xl sm:rounded-r-3xl max-h-48 overflow-scroll scrollbar-hide'>
                                {sessionData.map((item, index) => (
                                    <div key={index} className={`inline-grid bg-gray-500 text-white p-1 rounded m-1 ${index === sessionData.length - 1 ? 'bg-indigo-700' : ''}`}>
                                        <p>{item.company_name}</p>
                                        <p className='text-gray-100 text-sm'>{item.position}</p>
                                        <p className='text-gray-200 text-xs'>{item.languages.join(', ')}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`${open ? '' : 'hidden'}`}>
                            <button
                                className='text-white bg-indigo-500 hover:bg-indigo-600 transition duration-300 mb-2 p-2 rounded-r-3xl text-xs sm:text-base'
                                type='submit'
                                onClick={() => {
                                    window.location.reload()
                                }}
                            >
                                Reload Interview
                            </button>
                            <button
                                className='text-white bg-indigo-500 hover:bg-indigo-600 transition duration-300 mb-2 sm:ml-2 p-2 rounded-r-3xl sm:rounded-3xl text-xs sm:text-base'
                                type='submit'
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Start New Interview
                            </button>
                        </div>

                        <ul className={`bg-gray-100 border border-gray-300 rounded-r-3xl mr-2 p-2 ${open ? '' : 'hidden'} duration-100 text-sm sm:text-base break-words`}>
                            <li>
                                <strong>Company:</strong> {companyData.name}
                            </li>
                            <li>
                                <strong>Business:</strong> {companyData.business}
                            </li>
                            <li>
                                <strong>Description:</strong> {companyData.description}
                            </li>
                        </ul>
                        <ul className={`mt-2 bg-gray-100 border border-gray-300 rounded-r-3xl mr-2 p-2 ${open ? '' : 'hidden'} duration-100 text-sm sm:text-base break-words`}>
                            <li><strong><FaUserAstronaut /></strong> {companyData.question}</li>
                        </ul>
                        <ul className={`mt-2 bg-gray-100 border border-gray-300 rounded-r-3xl mr-2 mb-2 p-2 ${open ? '' : 'hidden'} duration-100 text-sm sm:text-base break-words`}>
                            <li>
                                <strong>Applied Position:</strong> {companyData.position}
                            </li>
                            <li>
                                <strong>Proficient Languages:</strong> {companyData.languages.join(', ')}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;