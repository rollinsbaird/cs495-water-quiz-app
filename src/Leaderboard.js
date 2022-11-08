import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Components/Modal";
import "./Leaderboard.css";
import SelectQuiz from "./SelectQuiz";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


class Player {
  constructor(name, score, timestamp) {
    this.name = name;
    this.score = score;
    this.timestamp = timestamp;
  }
}

function Leaderboard() {
  const player1 = new Player("Thom", .6, 1667505479);
  const player2 = new Player("Rollins", .8, 1667504479);
  const player3 = new Player("Sam", .7, 1668504479);

  const sortedPlayers = [player1,player2,player3].sort((a, b) => b["score"] - a["score"])
  for(let i = 0; i < sortedPlayers.length; i++){
    let scorePercent = Math.trunc(sortedPlayers[i]["score"]*100).toString() + "%";
    sortedPlayers[i]["scorePercent"] = scorePercent;
  }
  
  const handleClick = (e) => {
    console.log(e.target)
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const displayLeaderboard = () => {
    return (
      <div className="leaderboard">
        <header className="leaderboard-header">
          <h1>Leaderboard</h1>
          <div classname="duration">
            <button onClick={handleClick} data-id='1' className="leaderboard-button">1 Hour</button>
            <button onClick={handleClick} data-id='0' className="leaderboard-button">All Time</button>
          </div>
          <br></br>
             
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow className="leaderboard-table-row">
                <TableCell className="leaderboard-table-cell-head">Name</TableCell>
                <TableCell className="leaderboard-table-cell-head" align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPlayers.map((player) => (
                <TableRow
                  key={player.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell className="leaderboard-table-cell">
                    {player.name}
                  </TableCell>
                  <TableCell className="leaderboard-table-cell" align="right">{player.scorePercent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </header>
    </div>

      // <div className="leaderboard">
      //     <header className="leaderboard-header">
      //       <h1>Leaderboard</h1>
      //       <div classname="duration">
      //         <button onClick={handleClick} data-id='1' className="leaderboard-button">1 Hour</button>
      //         <button onClick={handleClick} data-id='0' className="leaderboard-button">All Time</button>
      //       </div>
      //       <br></br>
      //       <table className="leaderboard-table">
      //         <tr>
      //           <th>Name</th>
      //           <th>Score</th>
      //         </tr>
      //         <tr>
      //           <td> {sortedData[0]["name"]} </td>
      //           <td> {sortedData[0]["scorePercent"]} </td>
      //         </tr>
      //         <tr> 
      //           <td> {sortedData[1]["name"]} </td>
      //           <td> {sortedData[1]["scorePercent"]} </td>
      //         </tr>
      //         <tr> 
      //           <td> {sortedData[2]["name"]} </td>
      //           <td> {sortedData[2]["scorePercent"]} </td>
      //         </tr>
      //       </table>
            
           
      //     </header>
      //   </div>
        );
  }

  return (
    <>{displayLeaderboard()}</>
  );
}
export default Leaderboard;
