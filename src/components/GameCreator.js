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
  Box,
  CloseButton,
} from "@chakra-ui/react"
import { useDisclosure, useToast } from "@chakra-ui/react"
import { GameKeysContext } from '../App'
import { useState, useContext } from "react"
import { Web3Context } from "web3-hooks";

function GameCreator() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const gameKeys = useContext(GameKeysContext)
  const [web3State] = useContext(Web3Context)
  const [inputValue, SetInputValue] = useState('')
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleRegisterNewGame = async () => {
    const title = inputValue.title
    const cover = inputValue.cover
    const description = inputValue.description
    const price = inputValue.price

    setLoading(true)
    try {
      const tx = await gameKeys.registerNewGame(title, cover, description, price)
      const network = web3State.networkName.toLowerCase()
      const link = `https://${network}.etherscan.io/tx/${tx.hash}`

      toast({
        title: "Transation sent successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      })

      toast({
        title: 'Game created successfully',
        status: "success",
        render: ({ id, onClose }) => (
          <Box color="white" p={3} bg="green.500" rounded={20}>
            <CloseButton id={id} onClose={onClose} />
            <br />You can view your transaction at hash :
            <br /><a target="blank" style={{ color: "orange" }} href={link}>{tx.hash}</a>
          </Box>),
        position: "top-right",
        duration: 9000,
        isClosable: true,
      })
    } catch (e) {
      toast({
        title: 'Error',
        description: e.error ? e.error.message : e.message,
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }



  return (
    <>
      <Button
        onClick={onOpen}
        isLoading={loading}
        loadingText="Submitting"
        colorScheme="teal"
        variant="solid"
        size="lg"
        mt="5"
      >Create new game !</Button>


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
              <Input
                value={inputValue.price}
                onChange={(e) => SetInputValue({ ...inputValue, price: e.target.value })}
                placeholder="Game price in Finney"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleRegisterNewGame} colorScheme="blue" mr={3}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GameCreator