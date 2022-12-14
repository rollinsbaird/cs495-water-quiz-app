// Based on https://fireship.io/lessons/framer-motion-modal/
import { motion } from "framer-motion";
import Backdrop from "../Backdrop";
import Quiz from "../../Quiz";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose, quizId }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit">
        <Quiz quizId={quizId}/>
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
