"use client";
import React, { useEffect, useState } from "react";

const wordList = ["web3", "solana", "ethereum", "bitcoin", "degen", "crypto"];

const scrambleWord = (word: string) =>
  word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

const GameComponent = () => {
  const [originalWord, setOriginalWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState(""); 
  const [hintUsed, setHintUsed] = useState(false);

  const generateWord = () => {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    setOriginalWord(word);
    setScrambledWord(scrambleWord(word));
    setUserGuess("");
    setMessage("");
  };

  const checkGuess = () => {
    if (userGuess.toLowerCase() === originalWord) {
      setMessage("Correct! Next word...");
      setScore(score + 1);
      setTimeout(generateWord, 1000);
    } else {
      setMessage(" Incorrect, try again!");
    }
  };

  const revealHint = () => {
    setHint(`Hint: First letter is "${originalWord.charAt(0).toUpperCase()}"`);
    setHintUsed(true);
  };

  useEffect(() => {
    generateWord();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
    <h1 className="text-3xl font-bold mb-6">Word Scramble Game</h1>
    
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <p className="text-xl mb-4">Unscramble: <span className="font-bold text-yellow-400">{scrambledWord}</span></p>

      <input
        type="text"
        className="w-full p-2 rounded border text-black"
        placeholder="Your guess..."
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
      />

      <button
        onClick={checkGuess}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
      >
        Submit Guess
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>

    <p className="mt-4 text-lg">Score: <span className="font-bold">{score}</span></p>
  </div>
  );
};

export default GameComponent;
