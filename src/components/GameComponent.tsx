import React from 'react'

const wordList = ["web3", "solana", "ethereum", "bitcoin", "degen", "crypto"];

const scrambleWord = (word: string) => word.split("").sort(() => Math.random() - 0.5).join("");

const GameComponent = () => {
  return (
    <div>

    </div>
  )
}

export default GameComponent