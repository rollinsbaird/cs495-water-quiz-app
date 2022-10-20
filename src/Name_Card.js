import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Components/Modal";
import "./Homepage.css";

function NameCard(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  const showDifficulty = (difficulty) => {
    switch (difficulty) {
      case 1:
        return "Easy ✅";
      case 2:
        return "Medium 😄";
      case 3:
        return "Difficult 💪";
      case 4:
        return "Impossible 🔥";
      default:
        return "Easy ✅";
    }
  };

  return (
    <Item>
      <CardContent>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="quiz-tile-button"
          onClick={() => (modalOpen ? close() : open())}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {showDifficulty(props.difficulty)}
          </Typography>
          <Typography
            sx={{ fontSize: 36, fontWeight: "bold" }}
            color="text.primary">
            {props.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {props.description}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            #{props.tags}
          </Typography>
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
          {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} quizId={props.quizId} />}
        </AnimatePresence>
      </CardContent>
    </Item>
  );
}

export default NameCard;
