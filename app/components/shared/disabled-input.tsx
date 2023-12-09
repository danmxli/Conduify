import { motion } from "framer-motion";

const colors = ["#d1d5db", "#6b45fa", "#1e1b4b", "#9ca3af", "#a5b4fc"];

const containerVariants = {
    initial: {},
    animate: {
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
};

const dotVariants = {
    initial: {},
    animate: {
        height: [10, 40, 10],
        transition: {
            repeat: Infinity
        }
    }
};

const DisabledInput = () => {
    return (
        <div className="w-full p-6 border shadow rounded-2xl flex justify-center">
            <motion.div

                variants={containerVariants}
                initial="initial"
                animate="animate"
                style={{
                    display: "flex",
                    gap: 8,
                    height: 10,
                    alignItems: "center"
                }}
            >
                {Array(5)
                    .fill(null)
                    .map((_, index) => {
                        return (
                            <motion.div
                                key={index}
                                variants={dotVariants}
                                style={{
                                    height: 10,
                                    width: 10,
                                    backgroundColor: colors[index % colors.length],
                                    borderRadius: 20
                                }}
                            />
                        );
                    })}
            </motion.div>
        </div>
    )
}

export default DisabledInput