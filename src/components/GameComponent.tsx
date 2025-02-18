"use client";
import React, { useState } from "react";

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
  return <div></div>;
};

export default GameComponent;
