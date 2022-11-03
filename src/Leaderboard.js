import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Components/Modal";
import "./Leaderboard.css";
import SelectQuiz from "./SelectQuiz";


class Player {
  constructor(name, score, timestamp) {
    this.name = name;
    this.score = score;
    this.timestamp = timestamp;
  }
}

function Leaderboard() {
  const player1 = new Player("thom", "6/10", 1667505479);
  const player2 = new Player("Rollins", "8/10", 1667504479);

  const displayLeaderboard = () => {
    return (<div className="leaderboard">
          <header className="leaderboard-header">
            <h1>Leaderboard</h1>
            <div classname="duration">
              <button data-id='1' className="leaderboard-button">1 Hour</button>
              <button data-id='0' className="leaderboard-button">All Time</button>
            </div>
            <br></br>
            <table className="leaderboard-table">
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
              <tr>
                <td> {player1.name} </td>
                <td> {player1.score} </td> 
              </tr>
            </table>
            
           
          </header>
        </div>);
  }

  return (
    <>{displayLeaderboard()}</>
  );
}
export default Leaderboard;
