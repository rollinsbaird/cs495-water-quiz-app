import React, { useState } from "react";
import Rive from "@rive-app/react-canvas";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Components/Modal";
import "./Homepage.css";
import SelectQuiz from "./SelectQuiz";
// import Leaderboard from "./Leaderboard";

function Homepage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chooseQuiz, setChooseQuiz] = useState(false);

  const close = () => setModalOpen(false);
  // const open = () => setModalOpen(true);

  const displayHomepage = () => {
    return (
      <div className="homepage">
        <div className="spacerTop layer1"></div>
        <div className="homepage-droplet">
          <Rive src="/droplet.riv" />
        </div>
        <h1 className="page-title">HydroGenius</h1>
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
        <div className="spacer layer2"></div>
        <div className="about-section">
            <div className="about-text">
              <h2>
                What is <span className="fancy">HydroGenius</span>?
              </h2>
              <p>
                HydroGenius is an interactive quiz where you can test your water
                knowledge & see how you stack up against others. It was built
                by Rollins Baird, Thomas Hamption, & Sam Hertzler in conjunction
                Dr. Burian & Dr. Halgren from the Alabama Water Institute. We
                hope you have fun improving your water knowledge!
              </p>
            </div>
          <img
            className="logo-AWI"
            alt="AWI Logo"
            src="/awi_magnetlogo.png"></img>
        </div>
        <div className="spacer layer3"></div>
      </div>
    );
  };

  const displayOptions = () => {
    return chooseQuiz ? <SelectQuiz /> : displayHomepage();
  };

  // const quizId = 'Ref(Collection("Quizes"), "348045511873266258"';
  // const re = new RegExp('(?<=")[^"]*\\d(?=")');
  // const id = re.exec(quizId)[0];

  return <>{displayOptions()}</>;
}

export default Homepage;
