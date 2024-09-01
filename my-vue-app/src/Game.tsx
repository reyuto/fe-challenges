import { useState, useEffect } from "react";

type cellType = "X" | "O" | "";
type stepType = 1 | 0 | -1;
type gameProgressType = "winner" | "turns-over" | "playing";
type gameStateType = Array<cellType>[];

const Game = (props: { size: number }) => {
  const { size } = props;
  const initialState: gameStateType = [...Array(size)].map(() =>
    Array(size).fill("")
  );

  const [gameOver, setGameOver] = useState<gameProgressType>("playing");
  const [validTurns, setValidTurns] = useState(0);
  const [nextMove, setNextMove] = useState<cellType>("X");
  const [gameState, setGameState] = useState<gameStateType>(initialState);

  useEffect(() => {
    if (validTurns >= size * size) {
      setGameOver("turns-over");
    }
  }, [validTurns, size]);

  const resetGame = () => {
    setGameState(initialState);
    setGameOver("playing");
    setNextMove("X");
    setValidTurns(0);
  };

  const onPlay = (i: number, j: number) => {
    if (gameState[i][j] || gameOver !== "playing") return;
    const nextGameState = gameState.slice();
    nextGameState[i][j] = nextMove;
    setGameState(nextGameState);
    setValidTurns(validTurns + 1);
    if (isGameWon(i, j)) {
      setGameOver("winner");
    } else {
      setNextMove(nextMove == "X" ? "O" : "X");
    }
  };

  const checkPath = (
    x: number,
    y: number,
    xStep: stepType,
    yStep: stepType
  ): boolean => {
    if (x >= size || y >= size) return true;
    const nextCell = gameState[x][y];
    return nextCell === nextMove
      ? checkPath(x + xStep, y + yStep, xStep, yStep)
      : false;
  };

  const isGameWon = (x: number, y: number): boolean => {
    return (
      checkPath(0, y, 1, 0) ||
      checkPath(x, 0, 0, 1) ||
      checkPath(0, 0, 1, 1) ||
      checkPath(0, size - 1, 1, -1)
    );
  };

  return (
    <>
      {gameOver === "winner" ? (
        <h2>{nextMove} won the game!</h2>
      ) : gameOver === "turns-over" ? (
        <h2>No winner, game over!</h2>
      ) : (
        <h2>Next move for - {nextMove}</h2>
      )}
      <div className="GameContainer">
        {gameState.map((row, i) => (
          <div className="rows" key={i}>
            {row.map((cell, j) => (
              <div
                className="cells"
                key={i + "" + j}
                onClick={() => onPlay(i, j)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={() => resetGame()}>Reset Game</button>
    </>
  );
};

export default Game;
