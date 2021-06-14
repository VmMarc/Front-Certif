import React from 'react'
import Dapp from './Dapp'
import { useContract } from 'web3-hooks'
import {
  SimpleStorageAddress,
  SimpleStorageAbi,
} from './contracts/SimpleStorage'

export const SimpleStorageContext = React.createContext(null)

function App() {
  const simpleStorage = useContract(SimpleStorageAddress, SimpleStorageAbi)
  return (
    <SimpleStorageContext.Provider value={simpleStorage}>
      <Dapp />
    </SimpleStorageContext.Provider>
  )
}

export default App
