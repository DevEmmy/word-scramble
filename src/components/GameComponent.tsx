"use client";
import React, { useEffect, useState } from "react";

const wordList = ["web3", "solana", "ethereum", "bitcoin", "degen", "crypto"];

const scrambleWord = (word: string) =>
  word.split("").sort(() => Math.random() - 0.5).join("");

const GameComponent = () => {
  const [originalWord, setOriginalWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isError, setIsError] = useState(false);

  const generateWord = () => {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    setOriginalWord(word);
    setScrambledWord(scrambleWord(word));
    setUserGuess("");
    setMessage("");
    setTimeLeft(30);
    setHint("");
    setHintUsed(false);
  };

  const checkGuess = () => {
    if (userGuess.toLowerCase() === originalWord) {
      setMessage("✅ WAGMI! Next word...");
      setScore(score + (hintUsed ? 0.5 : 1));
      setTimeout(generateWord, 1000);
      setIsError(false);
    } else {
        setIsError(true);
      setMessage("❌ NGMI! Try again...");
    }
  };

  const revealHint = () => {
    setHint(`💡 Hint: Starts with "${originalWord.charAt(0).toUpperCase()}"`);
    setHintUsed(true);
  };

  useEffect(() => {
    generateWord();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setMessage("⏳ Time’s up! Next word...");
      setTimeout(generateWord, 1000);
    }
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-white p-4 font-mono">
      <h1 className="text-4xl font-bold mb-6 text-neon-green tracking-wide">
        🕹️ Web3 Word Scramble
      </h1>

      <div className="bg-[#121212] p-6 rounded-lg shadow-lg border border-neon-green w-80">
        <p className="text-xl mb-4 text-neon-purple">
          Unscramble:{" "}
          <span className="font-bold text-neon-blue">{scrambledWord}</span>
        </p>

        <input
          type="text"
          className="w-full p-2 rounded bg-black text-white border border-neon-blue text-center focus:outline-none focus:ring-2 focus:ring-neon-blue"
          placeholder="Your guess..."
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
        />

        <button
          onClick={checkGuess}
          className="mt-4 w-full bg-neon-green hover:bg-green-600 text-black font-bold p-2 rounded transition-all duration-300 hover:scale-105"
        >
          🚀 Submit Guess
        </button>

        <button
          onClick={revealHint}
          className={`mt-2 w-full ${
            hintUsed ? "bg-gray-600" : "bg-neon-purple hover:bg-purple-600"
          } text-white font-bold p-2 rounded transition-all duration-300 hover:scale-105`}
          disabled={hintUsed}
        >
          {hintUsed ? "🔒 Hint Used" : "🔑 Show Hint"}
        </button>

        {hint && <p className="mt-2 text-neon-yellow">{hint}</p>}

        {message && <p className={`mt-4 ${isError ? "text-neon-red" : "text-neon-green"} `}>{message}</p>}

        <p className="mt-4 text-lg">
          ⏳ Time Left:{" "}
          <span className="font-bold text-neon-orange">{timeLeft}s</span>
        </p>
      </div>

      <p className="mt-4 text-lg">
        💰 Score: <span className="font-bold text-neon-blue">{score}</span>
      </p>
    </div>
  );
};

export default GameComponent;
