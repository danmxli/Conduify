import { motion } from "framer-motion"

const RegistrationCards = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.15,
                duration: 0.55,
                ease: [0.165, 0.84, 0.44, 1],
            }}
            className="m-8 p-8 max-w-xs bg-indigo-500 text-white rounded-3xl shadow-lg">
            <h1 className="text-3xl">Conduify accelerates productivity.</h1>
            <h2 className="mb-6">Your performance and time are deeply valued. The optimal balance between the two is what our software looks for.</h2>
            <h1 className="text-3xl">A refreshing user interface.</h1>
            <h2 className="mb-6">Our intuitive design gives you the confidence and enjoyment you need to move forward with your tasks.</h2>
            <h1 className="text-3xl">Reliable and accurate results.</h1>
            <h2>Our models range from time complexity calculations to the conversion of pseudocode to programming languages.</h2>
        </motion.div>
    )
}

export default RegistrationCards