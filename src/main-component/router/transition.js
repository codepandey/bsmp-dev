import React from "react";
import { motion } from "framer-motion";
const animationConfiguration = {
  initial: { opacity: 0.5, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0.5, x: -200 },
};
const Transitions = ({ children }) => {
  return (
    <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.25,
        type: "tween",
        ease: "easeInOut",
        // bounce: 0.25,
      }}
    >
      {children}
    </motion.div>
  );
};
export default Transitions;
