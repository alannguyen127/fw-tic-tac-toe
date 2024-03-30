import React from "react";

function History({ history, moveTo }) {
  return (
    <div className="history">
      <h4>Turns history</h4>
      <ul>
        {history.map((step, move) => {
          const turn = move ? "Go to move:" + move : "Back to game start";
          return (
            <li key={move}>
              <button onClick={() => moveTo(move)}>{turn}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default History;
