import React, { useState, useEffect } from "react";
import "./snake.css";
const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("right");
  const [gameOver, setGameOver] = useState(false);

  const moveSnake = () => {
    const newSnake = [...snake];
    let newHead = { ...newSnake[0] };
    switch (direction) {
      case "right":
        newHead.x += 1;
        break;
      case "left":
        newHead.x -= 1;
        break;
      case "up":
        newHead.y -= 1;
        break;
      case "down":
        newHead.y += 1;
        break;
      default:
        break;
    }
    newSnake.unshift(newHead);
    newSnake.pop();
    setSnake(newSnake);
  };

  const checkCollision = () => {
    if (
      snake[0].x < 0 ||
      snake[0].x >= 20 ||
      snake[0].y < 0 ||
      snake[0].y >= 20
    ) {
      setGameOver(true);
    }
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        setGameOver(true);
      }
    }
  };

  const generateFood = () => {
    let newFood = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
    while (snake.some((part) => part.x === newFood.x && part.y === newFood.y)) {
      newFood = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20),
      };
    }
    setFood(newFood);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
      checkCollision();
    }, 500);
    return () => clearInterval(interval);
  }, [snake]);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowRight":
        setDirection("right");
        break;
      case "ArrowLeft":
        setDirection("left");
        break;
      case "ArrowUp":
        setDirection("up");
        break;
      case "ArrowDown":
        setDirection("down");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    generateFood();
  }, []);

  return (
    <div onKeyDown={handleKeyDown} tabIndex="0">
      <h1>Snake Game</h1>
      <div className="game-board">
        {[...Array(20)].map((_, y) => (
          <div className="row" key={y}>
            {[...Array(20)].map((_, x) => (
              <div
                className={`cell ${
                  snake.some((part) => part.x === x && part.y === y)
                    ? "snake"
                    : ""
                } ${food.x === x && food.y === y ? "food" : ""}`}
                key={`${x}-${y}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="score">
        Score: {snake.length - 1}
        {gameOver && <p>Game Over</p>}
      </div>
    </div>
  );
};

export default SnakeGame;
