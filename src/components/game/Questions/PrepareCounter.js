import { motion } from "framer-motion";

const PrepareCounter = ({ seconds }) => {
  return (
    <motion.div
      className="text-white text-6xl font-semibold drop-shadow-2xl"
      key={seconds}
      initial={{ scale: 2, opacity: 1 }}
      animate={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      {seconds}
    </motion.div>
  );
};

export default PrepareCounter;
