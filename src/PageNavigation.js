import React from "react";
import { useState } from "react";
import Homepage from "./Homepage.js";
import SelectQuiz from "./SelectQuiz.js";
import Leaderboard from "./Leaderboard.js";

function PageNavigation() {
    const [activePage, setActivePage] = useState(0);
    
    switch (activePage){
        case 0: return <Homepage toSelectQuiz={ () => setActivePage(1)}/>
        case 1: return <SelectQuiz toHomepage={ () => setActivePage(0)} toLeaderboard={ () => setActivePage(2)}/>
        case 2: return <Leaderboard toSelectQuiz={ () => setActivePage(1)}/>
        default: return <Homepage toSelectQuiz={ () => setActivePage(1)}/>
    }
}

export default PageNavigation;