import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

const PromptNextPage = ({ open, toggleSidebar, companyData }) => {
    return (
        <div className='bg-indigo-200 w-full sm:rounded-l-3xl flex flex-col justify-center items-center'>
            <div className="m-5 sm:mt-0 p-4 bg-indigo-800 rounded-3xl inline-grid text-white">
                <p className="sm:text-3xl">Ready to take it to the next level?</p>
                <p className="mt-1 mb-2 text-xs sm:text-base">Attempt a hands-on techincal interview!</p>
                <div className='inline-flex'>
                    <BsFillArrowLeftCircleFill className={`rounded-md text-2xl sm:text-5xl duration-700 cursor-pointer text-indigo-500 hover:text-white ${open && 'rotate-[540deg]'
                        }`}
                        onClick={() => toggleSidebar(!open)} />
                        {!open && <p className='ml-3 text-lg text-purple-400'>Go back to Session</p>}
                </div>
                
            </div>
            <div className="ml-2 mr-2 sm:ml-16 sm:mr-16 p-4 bg-indigo-400 rounded-3xl inline-grid text-white">
                Remember that a hands-on technical interview focuses on solving real-world problems, often using code. Be prepared to think spontaneously and critically!
            </div>
            {open ? (<></>) : (
                <div className="m-5 sm:mb-0 p-4 bg-indigo-950 rounded-3xl inline-grid text-white">
                    <ul className={`text-sm sm:text-base break-words`}>
                        <b className='text-purple-400'>Hands-on Techinical Interview</b>
                        <li>
                            <strong>Company:</strong> {companyData.name}
                        </li>
                        <li>
                            <strong>Applied Position:</strong> {companyData.position}
                        </li>
                        <li>
                            <strong>Proficient Languages:</strong> {companyData.languages.join(', ')}
                        </li>
                    </ul>
                    <button
                        className='mt-2 text-white bg-indigo-500 hover:bg-indigo-600 transition duration-300 mb-2 p-2 rounded-xl text-xs sm:text-base'
                        type='submit'
                        onClick={() => {
                            
                        }}
                    >
                        Start
                    </button>
                </div>)}
        </div>
    );
}

export default PromptNextPage