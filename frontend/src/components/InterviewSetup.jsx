import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const InterviewSetup = ({ username }) => {
    const [selectedLanguages, setSelectedLanguages] = useState(["Python"]);
    const [company, setCompany] = useState('Cohere');
    const [position, setPosition] = useState('Software Engineer');

    const navigate = useNavigate();

    const handleCompanyChange = (e) => {
        setCompany(e.target.value);
    };
    const handlePositionChange = (e) => {
        setPosition(e.target.value);
    };

    const handleLanguageChange = (e) => {
        const value = e.target.value;
        if (selectedLanguages.includes(value)) {
            setSelectedLanguages(selectedLanguages.filter(lang => lang !== value));
        } else {
            setSelectedLanguages([...selectedLanguages, value]);
        }
    };

    const handleStart = () => {
        const state = {
            company: company,
            position: position,
            selectedLanguages: selectedLanguages,
            userName: username,
        };
        localStorage.setItem('navigatedFromHome', 'true');
        console.log(state)
        navigate("/chat", { state });
    };

    return (
        <div>
            <div className='inline-grid grid-cols-2 gap-4'>
                <div>
                    <div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">I am interested in applying to...</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Awesome Tech Company"
                                value={company}
                                onChange={handleCompanyChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:border-indigo-500 transition"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">As a...</label>
                            <select
                                id="role"
                                name="role"
                                value={position}
                                onChange={handlePositionChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring focus:ring-indigo-200">
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="ML Engineer">ML Engineer</option>
                                <option value="DevOps Engineer">DevOps Engineer</option>
                                <option value="Data Scientist">Data Scientist</option>
                                <option value="Fullstack Developer">Fullstack Developer</option>
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Automation Developer">Automation Developer</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition duration-300"
                            onClick={() => { handleStart() }}
                        >Start</button>

                    </div>
                    <div className='mt-6'>
                        <h3 className="text-lg font-semibold mb-2">An Enriching Learning Platform.</h3>
                        <p className="text-gray-500">We compile information from reliable sources and pose thoughtful, perceptive questions.</p>
                    </div>
                </div>
                <div className='bg-gray-50'>
                    <div className='text-center bg-gray-100 text-md sm:text-lg font-semibold'>
                        I am skilled in...
                    </div>
                    <div className='inline-grid grid-cols-2 md:grid-cols-3 gap-4 p-0 sm:p-3 break-words'>
                        <div>
                            <div className='mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Python"
                                        checked={selectedLanguages.includes("Python")}
                                        onChange={handleLanguageChange}
                                    /> Python
                                </label>
                            </div>
                            <div className='mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Cpp"
                                        checked={selectedLanguages.includes("Cpp")}
                                        onChange={handleLanguageChange}
                                    /> C++
                                </label>
                            </div>
                            <div className='mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Go"
                                        checked={selectedLanguages.includes("Go")}
                                        onChange={handleLanguageChange}
                                    /> Go
                                </label>
                            </div>
                            <div className='mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="R"
                                        checked={selectedLanguages.includes("R")}
                                        onChange={handleLanguageChange}
                                    /> R
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className='mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="SQL"
                                        checked={selectedLanguages.includes("SQL")}
                                        onChange={handleLanguageChange}
                                    /> SQL
                                </label>
                            </div>
                            <div className='mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="CSharp"
                                        checked={selectedLanguages.includes("CSharp")}
                                        onChange={handleLanguageChange}
                                    /> C#
                                </label>
                            </div>
                            <div className='mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="PHP"
                                        checked={selectedLanguages.includes("PHP")}
                                        onChange={handleLanguageChange}
                                    /> PHP
                                </label>
                            </div>
                            <div className='mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Java"
                                        checked={selectedLanguages.includes("Java")}
                                        onChange={handleLanguageChange}
                                    /> Java
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className='mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="JavaScript"
                                        checked={selectedLanguages.includes("JavaScript")}
                                        onChange={handleLanguageChange}
                                    /> JavaScript
                                </label>
                            </div>
                            <div className='mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Rust"
                                        checked={selectedLanguages.includes("Rust")}
                                        onChange={handleLanguageChange}
                                    /> Rust
                                </label>
                            </div>
                            <div className='mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="TypeScript"
                                        checked={selectedLanguages.includes("TypeScript")}
                                        onChange={handleLanguageChange}
                                    /> TypeScript
                                </label>
                            </div>
                            <div className='mb-4'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Other"
                                        checked={selectedLanguages.includes("Other")}
                                        onChange={handleLanguageChange}
                                    /> Other
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewSetup;
