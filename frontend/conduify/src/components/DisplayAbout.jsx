const DisplayAbout = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 sm:p-10">
                <div className="bg-gray-100 p-3 rounded-lg">
                    <h1 className="text-xl sm:text-5xl break-words mb-1">Meet Conduify.</h1>
                    <code className='text-indigo-500'>your personal interview preparation assistant.</code>
                    <p className='mt-3 mb-2'>
                        Ace your interviews with Conduify. With test-driven methodologies and a plethora of coding challenges inspired by Leetcode coming soon, you will be way ahead of the competition!
                    </p>
                    <a href="https://github.com/danmxli/Conduify" className="p-1 bg-emerald-100 hover:bg-emerald-200 border border-emerald-500 rounded">Conduify Beta Version 1.0.0</a>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                    <h1 className="text-xl">Amazing Experience. 🚀</h1>
                    <p className='italic'>Conduify made me realize how capable I am in the tech industry. I am starting an internship as a front end developer and I am thrilled I discovered this app! ~ anonymous</p>
                    <h1 className="mt-2 text-xl">Super Interactive. 💫</h1>
                    <p className='italic'>The questions are custom tailored to my position, exactly what I needed! ~ anonymous</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <a href='https://www.linkedin.com/in/danli591/' className='text-indigo-500 hover:text-indigo-600'>
                        <h1 className="text-lg font-bold">Reach out to the Creator</h1>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default DisplayAbout