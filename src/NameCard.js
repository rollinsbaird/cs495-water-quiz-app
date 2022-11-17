import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Components/Modal";
import "./Homepage.css";
import "./NameCard.css";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function NameCard(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => {
    setModalOpen(false);
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = "";
    body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  };
  const open = () => {
    setModalOpen(true);
    const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = "0%";
    body.style.top = `-${scrollY}`;
  };

  const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
    "&:hover": {
      scale: "1.1",
      width: "100%",
    }
    // flexGrow: 1,
    // flexDirection: "column",
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
          <Box>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "end" }}>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="trophy-button"
                onClick={props.toLeaderboard}>
                <EmojiEventsIcon className="trophy" sx={{ fontSize: "100" }} />
              </motion.button>
            </Box>
            <motion.button
              className="quiz-tile-button"
              onClick={() => (modalOpen ? close() : open())}>
              <Typography sx={{ fontSize: 10 }} color="text.secondary">
                {showDifficulty(props.difficulty)}
              </Typography>
              <Box sx={{ minHeight: 72, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                <Typography
                  sx={{ fontSize: 24, fontWeight: "bold" }}
                  color="text.primary">
                  {props.title}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 10 }} color="text.secondary">
                {props.description}
              </Typography>
            </motion.button>
          </Box>
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
          {modalOpen && (
            <Modal
              modalOpen={modalOpen}
              handleClose={close}
              quizId={props.quizId}
            />
          )}
        </AnimatePresence>
      </CardContent>
    </Item>
  );
}

export default NameCard;
