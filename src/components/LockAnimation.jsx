import { motion } from "framer-motion";

export default function LockAnimation() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex flex-col items-center justify-center text-center p-10"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-6xl"
      >
        🔒
      </motion.div>

      <h2 className="mt-6 text-xl font-bold text-cyan-300">
        Vote Securely Locked
      </h2>

      <p className="text-sm text-gray-300 mt-2">
        Your vote has been successfully secured under government encryption.
      </p>
    </motion.div>
  );
}
