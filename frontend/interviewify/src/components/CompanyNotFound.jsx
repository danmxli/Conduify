import { useNavigate } from "react-router-dom";

const CompanyNotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="fixed w-full h-full bg-indigo-600 items-center">
            <div className="text-white text-5xl p-5 bg-indigo-950">
                Sorry, company data not found.
            </div>
            <div className="p-5">
                <button
                    className='text-purple-400 bg-indigo-950 p-4 rounded-xl text-3xl'
                    type='submit'
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Take me home
                </button>
            </div>
            <div className="p-5 text-white">
                <>
                    <p className="text-2xl">Why are you seeing this?</p>
                    <p>Our systems gather data from resources across the globe. Perhaps your company is not well known, or in the technology sector.</p>
                </>
            </div>
        </div>
    )
}

export default CompanyNotFound