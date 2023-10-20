import '../App.css'

const Home = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="bg-gray-100 rounded-full flex items-center justify-center h-screen">
                <div className="bg-white p-8 rounded-3xl shadow-lg">
                    <h2 className="text-lg sm:text-2xl font-semibold mb-3">Get Ready For Your Interview!</h2>
                    <div className='inline-grid grid-cols-2 gap-4'>
                        <div>
                            <div>
                                <form>
                                    <div className="mb-4">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">I am interested in applying to...</label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            placeholder="Awesome Tech Company"
                                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring focus:ring-indigo-200"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">As a...</label>
                                        <select id="role" name="role" className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring focus:ring-indigo-200">
                                            <option value="software-engineer">Software Engineer</option>
                                            <option value="ml-engineer">ML Engineer</option>
                                            <option value="devops-engineer">DevOps Engineer</option>
                                            <option value="data-scientist">Data Scientist</option>
                                            <option value="fullstack-developer">Fullstack Developer</option>
                                            <option value="frontend-developer">Frontend Developer</option>
                                            <option value="backend-developer">Backend Developer</option>
                                            <option value="automation-developer">Automation Developer</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition duration-300"
                                    >Start</button>
                                </form>
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
                            <div className='inline-grid grid-cols-2 md:grid-cols-3 gap-4 p-0 sm:p-3'>
                                <div>
                                    <div className='mb-4'>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Python"
                                            /> Python
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Cpp"
                                            /> C++
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Go"
                                            /> Go
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="R"
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
                                            /> SQL
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="CSharp"
                                            /> C#
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="PHP"
                                            /> PHP
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Java"
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
                                            /> JavaScript
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Rust"
                                            /> Rust
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="TypeScript"
                                            /> TypeScript
                                        </label>
                                    </div>
                                    <div className='mb-4'>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="TypeScript"
                                            /> Other
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>

            <div>
                <div className="flex items-center justify-center h-screen">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 sm:p-10">
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <h1 className="text-xl sm:text-5xl break-words">Meet Interviewify.</h1>
                            <code className='text-indigo-500'>your personal interview preparation assistant.</code>
                            <p className='mt-3'>
                                Ace your interviews with interviewify. With test-driven methodologies and a plethora of coding challenges inspired by Leetcode coming soon, you will be way ahead of the competition!
                            </p>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <h1 className="text-xl">Amazing Experience. 🚀</h1>
                            <p className='italic'>Interviewify made me realize how capable I am in the tech industry. I am starting an internship as a front end developer and I am thrilled I discovered this app! ~ anonymous</p>
                            <h1 className="mt-2 text-xl">Super Interactive. 💫</h1>
                            <p className='italic'>The questions are custom tailored to my position, exactly what I needed! ~ anonymous</p>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg">
                            <a href='https://www.linkedin.com/in/danli591/' className='text-indigo-500 hover:text-indigo-600'>
                                <h1 className="text-lg font-bold">Reach out to the Creator</h1>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home