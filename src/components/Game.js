import React, { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History";

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  // const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [stepNum, setStepNum] = useState(0);

  //Declaring a Winner
  useEffect(() => {
    const winPlayer = calculateWinner(history[history.length - 1].squares);
    setWinner(winPlayer);
  }, [history]);

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  //Handle player
  const handleClick = (i) => {
    const currentHistory = history.slice(0, stepNum + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();

    if (winner || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      currentHistory.concat([
        {
          squares: squares,
        },
      ])
    );
    setStepNum(currentHistory.length);
    setXIsNext(!xIsNext);
  };

  //Restart game
  const handleRestart = () => {
    setStepNum(0);
    // setSquares(Array(9).fill(null));
    setHistory([{ squares: Array(9).fill(null) }]);
    setXIsNext(true);
  };

  //Undo move
  const moveTo = (step) => {
    setStepNum(step);
    setXIsNext(step % 2 === 0);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : ""}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={history[stepNum].squares} handleClick={handleClick} />
        <History history={history} moveTo={moveTo} />
      </div>
      <button onClick={handleRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
