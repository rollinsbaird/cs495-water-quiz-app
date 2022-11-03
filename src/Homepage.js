import React, { useState } from "react";
import logo from "./logo.svg";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Components/Modal";
import "./Homepage.css";
import SelectQuiz from "./SelectQuiz";

function Homepage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chooseQuiz, setChooseQuiz] = useState(false);

  const close = () => setModalOpen(false);
  // const open = () => setModalOpen(true);

  const displayHomepage = () => {
    return (<div className="Homepage">
          <header className="Homepage-header">
            <img src={logo} className="Homepage-logo" alt="logo" />
            <h1>HydroGenius</h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="open-button"
              onClick={() => setChooseQuiz(true)}>
              Select a Quiz
            </motion.button>
            <AnimatePresence
              // Disable any initial animations on children that
              // are present when the component is first rendered
              initial={false}
              // Only render one component at a time.
              // The exiting component will finish its exit
              // animation before entering component is rendered
              exitBeforeEnter={true}
              // Fires when all exiting nodes have completed animating out
              onExitComplete={() => null}>
              {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
            </AnimatePresence>
            <p>
              Created by
              <br />
              Rollins Baird, Thomas Hampton, and Sam Hertzler
              <br />
              in conjuction with
              <br />
              Dr. Burian, Dr. Halgren, and the National Water Institute.
              <br />
            </p>
          </header>
        </div>);
  }

  const displayOptions = () => {
    return (chooseQuiz) ? <SelectQuiz/> : displayHomepage();
  }

  return (
    <>{displayOptions()}</>
  );
}

export default Homepage;
