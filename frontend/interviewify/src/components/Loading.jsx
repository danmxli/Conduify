import { useState, useEffect } from 'react';

const Loading = () => {
    const [currentImg, setCurrentImg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImg((currentImg) => (currentImg + 1) % 4);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed w-full h-full bg-gray-800 items-center">
            <>
                <div className='text-xl sm:text-6xl text-center text-slate-400 mt-6 animate-pulse'>
                    Loading...
                </div>
            </>
           
            <div className='pt-16 sm:pl-24 sm:pr-24 inline-grid grid-cols-1 gap-4'>
                <ColorfulDiv
                    color="bg-red-400"
                    active={currentImg === 0}
                    transitionDelay={0}
                    text='Our goal is to provide prompts that are reliable, fast, and responsive to your interview preparation efforts through the best possible integration with language models. We seamlessly fit into every company description, and our engineering response time is outstanding.'
                />
                <ColorfulDiv
                    color="bg-blue-400"
                    active={currentImg === 1}
                    transitionDelay={100}
                    text='We collect real-time information about the business operations, culture, valuation, and description of the company. All of this is done to ensure that the user has a flawless experience while utilizing the full potential of our application.'
                />
                <ColorfulDiv
                    color="bg-green-400"
                    active={currentImg === 2}
                    transitionDelay={100}
                    text='In order for you to concentrate on the most important aspects of our application, namely the interview preparation proccess, we designed the user interface to be aesthetically pleasing, responsive, and clear.'
                />
                <ColorfulDiv
                    color="bg-violet-400"
                    active={currentImg === 3}
                    transitionDelay={100}
                    text='We provide succinct, straightforward questions along with thorough evaluations that point out the advantages and disadvantages of each response. Each grading experience you have as the user will only make your tools stronger.'
                />
            </div>
        </div>
    );
};

const ColorfulDiv = ({ color, active, transitionDelay, text }) => {
    return (
        <div
            className={`p-4 animate-bounce rounded-lg ${color} ${active ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-700 ease-in-out`}
            style={{ animationDelay: `${transitionDelay}ms` }}
        >
            <h1 className='text-center font-bold text-xs sm:text-lg'>
                {text}
            </h1>

        </div>
    );
};

export default Loading;