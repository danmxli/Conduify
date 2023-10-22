import React from 'react';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

const Sidebar = ({ open, toggleSidebar, companyData }) => {
    return (
        <div className={`${open ? 'w-9/12' : 'w-10'} bg-white border-r border-gray-300 duration-700`}>
            <div className="overflow-scroll sm:overflow-clip">
                {companyData && (
                    <div className="h-screen overflow-scroll scrollbar-hide">
                        <div className="inline-flex">
                            <IoIosArrowDroprightCircle
                                className={`rounded-md mt-1 text-4xl duration-700 cursor-pointer ${open && 'rotate-[540deg]'
                                    }`}
                                onClick={() => toggleSidebar(!open)}
                            />
                            <h2 className={`text-md sm:text-xl font-semibold ml-2 mt-2 ${open ? '' : 'hidden'} duration-100`}> Information</h2>
                        </div>

                        <div className={`${open ? '' : 'hidden'}`}>
                            <button
                                className='text-white bg-indigo-500 hover:bg-indigo-600 transition duration-300 mb-2 p-2 rounded-r-3xl'
                                type='submit'
                                onClick={() => {
                                    window.location.reload()
                                }}
                            >
                                Reload Interview
                            </button>
                        </div>

                        <ul className={`bg-gray-100 border border-gray-300 rounded-r-3xl mr-2 p-2 ${open ? '' : 'hidden'} duration-100 text-sm sm:text-base`}>
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
                        <ul className={`mt-2 bg-gray-100 border border-gray-300 rounded-r-3xl mr-2 p-2 ${open ? '' : 'hidden'} duration-100 text-sm sm:text-base`}>
                            <li>{companyData.question}</li>
                        </ul>
                        <ul className={`mt-2 bg-gray-100 border border-gray-300 rounded-r-3xl mr-2 mb-2 p-2 ${open ? '' : 'hidden'} duration-100 text-sm sm:text-base`}>
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