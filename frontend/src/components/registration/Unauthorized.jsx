import { useNavigate } from "react-router-dom"
const Unauthorized = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-3xl shadow-lg">
                <div className=''>
                    <img src='/interviewify.svg' alt='Logo' className='h-36' />
                </div>
                <h1 className='text-2xl font-semibold text-zinc-600'>
                    Enjoy everything that Conduify has to offer by signing in.
                </h1>
                <p className='mb-3 text-gray-400'><code>We value the security of our users.</code></p>
                <button
                    type="submit"
                    className="mt-1 bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition duration-300"
                    onClick={() => {
                        navigate('/portal')
                    }}
                >Take me to the sign in page</button>
            </div>
        </div>
    )
}

export default Unauthorized