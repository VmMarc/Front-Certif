import { useContext, useEffect, useState } from 'react'
import { SimpleStorageContext } from './App'

function Dapp() {
  const simpleStorage = useContext(SimpleStorageContext)
  const [value, setValue] = useState(0)
  const [inputValue, SetInputValue] = useState('')

  // Get storage value when component is mounted
  useEffect(() => {
    if (simpleStorage) {
      const getValue = async () => {
        try {
          const _value = await simpleStorage.getData()
          setValue(_value)
        } catch (e) {
          console.log(e)
        }
      }
      getValue()
    }
  }, [simpleStorage])

  // Listen to DataSet event and react with a state change
  useEffect(() => {
    // si simpleStorage est pas null alors
    if (simpleStorage) {
      const cb = (account, str) => {
        console.log(str)
        setValue(str)
      }
      // ecouter sur l'event DataSet
      simpleStorage.on('DataSet', cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        simpleStorage.off('DataSet', cb)
      }
    }
  }, [simpleStorage])

  const handleClickSetStorage = async () => {
    try {
      await simpleStorage.setData(inputValue)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <p>value: {value}</p>
      <input
        value={inputValue}
        onChange={(event) => SetInputValue(event.target.value)}
      />
      <button onClick={handleClickSetStorage}>set storage</button>
    </>
  )
}

export default Dapp
