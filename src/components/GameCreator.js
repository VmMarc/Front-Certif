import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal
} from "@chakra-ui/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Center
} from "@chakra-ui/react"
import { useDisclosure, useToast, Container, VStack } from "@chakra-ui/react"
import { GameKeysContext } from '../App'
import { useState, useContext, useEffect } from "react"
import { Web3Context } from "web3-hooks";
import { ethers } from "ethers";

function GameCreator() {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const gameKeys = useContext(GameKeysContext)
  const [web3State] = useContext(Web3Context)
  const [inputValue, SetInputValue] = useState('')
  const [etherBalance, setEtherBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const handleRegisterNewGame = async () => {
    const title = inputValue.title
    const cover = inputValue.cover
    const description = inputValue.description
    const price = inputValue.price
    try {
      setIsLoading(true)
      let tx = await gameKeys.registerNewGame(title, cover, description, price)
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
      const cb = (account, gameID, priceInFinney) => {
        toast({
          title: 'Event NewGameRegistered',
          description: `Game ID: ${gameID} Game creator: ${account} Price in Finney: ${priceInFinney}`,
          status: 'info',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      }
      // ecouter sur l'event DataSet
      gameKeys.on('NewGameRegistered', cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        gameKeys.off('NewGameRegistered', cb)
      }
    }
  }, [gameKeys, web3State.account, toast])

  // Listen to GameCreatorAdded event and react with a state change
  useEffect(() => {
    if (gameKeys) {
      const GameBenefitsWithdrewEvent = (account, profitAmount) => {
        toast({
          title: 'Event GameBenefitsWithdrew',
          description: `Game creator: ${account} claimed ${profitAmount} finney`,
          status: 'info',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      }
      // ecouter sur l'event DataSet
      gameKeys.on('GameBenefitsWithdrew', GameBenefitsWithdrewEvent)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        gameKeys.off('GameBenefitsWithdrew', GameBenefitsWithdrewEvent)
      }
    }
  }, [gameKeys, web3State.account, toast])

  const getBalances = async () => {
    try {
      setIsLoading(true)
      let tx = await gameKeys.getCreatorBalance(web3State.account.toLowerCase())
      setEtherBalance(ethers.utils.formatEther(tx))
    } catch (e) {
      if (e.code === 4001) {
        toast({
          title: 'Transaction failed',
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

  const handleWithdrawButton = async () => {
    try {
      setIsLoading(true)
      let tx = await gameKeys.withdraw()
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

  return (
    <Container centerContent maxW="container.xl" py="10">
      <Heading mb="5">Game Creator's Dashboard</Heading>
      <VStack spacing="20px">
        <Popover>
          <PopoverTrigger>
            <Button
              onClick={getBalances}
              colorScheme="whatsapp"
              variant="solid"
              size="lg"
              mt="5">
              Withdraw your profits</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Center>
                  <Button
                    isCentered colorScheme="blue"
                    isLoading={isLoading}
                    loadingText="claiming profits..."
                    onClick={handleWithdrawButton}>
                    Claim  {etherBalance} ETH now !
                  </Button>
                </Center>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>

        <Button
          isLoading={isLoading}
          loadingText="adding new game"
          onClick={onOpen}
          colorScheme="teal"
          variant="solid"
          size="lg"
          mt="5"
        >Create new game !</Button>

        {/* register modal */}

        <Modal
          isCentered
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Informations</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  value={inputValue.title}
                  onChange={(e) => SetInputValue({ ...inputValue, title: e.target.value })}
                  placeholder="Game title"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Cover</FormLabel>
                <Input
                  value={inputValue.cover}
                  onChange={(e) => SetInputValue({ ...inputValue, cover: e.target.value })}
                  placeholder="https://www.google.com/your-image.jpg"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  value={inputValue.description}
                  onChange={(e) => SetInputValue({ ...inputValue, description: e.target.value })}
                  placeholder="Tell us more about this game"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <NumberInput step={1} min={0} max={100}>
                  <NumberInputField
                    value={inputValue.price}
                    onChange={(e) => SetInputValue({ ...inputValue, price: e.target.value })}
                    placeholder="Game price in Finney"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={isLoading}
                loadingText="adding new game..."
                colorScheme="teal"
                onClick={handleRegisterNewGame}
                mr={3}>
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  )
}

export default GameCreator