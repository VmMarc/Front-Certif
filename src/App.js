import React from 'react'
import Dapp from './Dapp'
import { useContract } from 'web3-hooks'
import {
  GameKeysAddress,
  GameKeysABI,
} from './contracts/GameKeys'

export const GameKeysContext = React.createContext(null)

function App() {
  const gameKeys = useContract(GameKeysAddress, GameKeysABI)
  return (
    <GameKeysContext.Provider value={gameKeys}>
      <Dapp />
    </GameKeysContext.Provider>
  )
}

export default App
