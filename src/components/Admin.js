import { useContext, useEffect, useState } from 'react'
import {
  Input,
  Button,
  Flex,
  HStack,
  useToast,
  Container,
  Heading
} from '@chakra-ui/react'
import { Web3Context } from 'web3-hooks'
import { GameKeysContext } from '../App'

function Admin() {
  const [web3State] = useContext(Web3Context)
  const gameKeys = useContext(GameKeysContext)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, SetInputValue] = useState('')
  const toast = useToast()

  const handleClickAddGameCreator = async () => {
    try {
      setIsLoading(true)
      let tx = await gameKeys.addGameCreator(inputValue)
      await tx.wait()
      toast({
        title: 'Confirmed transaction',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (e) {
      if (e.code === 4001) {
        toast({
          title: 'Transaction signature denied',
          description: e.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  // Listen to GameCreatorAdded event and react with a state change
  useEffect(() => {
    if (gameKeys) {
      const cb = (account) => {
        if (account.toLowerCase() !== web3State.account.toLowerCase()) {
          toast({
            title: 'Event GameCreatorAdded',
            description: `${account} has now GAME_CREATOR role`,
            status: 'info',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          })
        }
      }
      // ecouter sur l'event DataSet
      gameKeys.on('GameCreatorAdded', cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        gameKeys.off('GameCreatorAdded', cb)
      }
    }
  }, [gameKeys, web3State.account, toast])

  return (
    <Container centerContent maxW="container.xl" py="10">
      <Heading mb="5">Admin's Dashboard</Heading>
      <Flex flexDirection="column" alignItems="center" m={4} h="300px">
        <>
          <HStack>
            <Input
              width="50"
              value={inputValue}
              placeholder="address"
              onChange={(event) => SetInputValue(event.target.value)}
            />
            <Button
              isLoading={isLoading}
              loadingText="adding game creator"
              colorScheme="teal"
              onClick={handleClickAddGameCreator}
            >
              add game creator
            </Button>
          </HStack>
        </>
      </Flex>
    </Container>
  )
}

export default Admin;