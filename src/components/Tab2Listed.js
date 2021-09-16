import { Center, Heading, Image, Container, Button, VStack } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
import { useState, useContext, useEffect } from "react"
import { Web3Context } from "web3-hooks";
import { ethers } from "ethers"
import { GameKeysContext } from "../App"

const Tab2Listed = ({ nft }) => {
  const gameKeys = useContext(GameKeysContext)
  const [web3State] = useContext(Web3Context);
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)


  const handleBuyButton = async () => {
    try {
      setIsLoading(true)
      const tx = await gameKeys.buyGame(nft.gameID, { value: ethers.utils.parseEther(nft.price) })
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
      const cb = (account, gameId, licenseId, price) => {
        toast({
          title: 'Event GameBought',
          description: `${account} bought game licence ID ${licenseId} from game ID ${gameId} for ${price} finney`,
          status: 'info',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })
      }
      // ecouter sur l'event DataSet
      gameKeys.on('GameBought', cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        gameKeys.off('GameBought', cb)
      }
    }
  }, [gameKeys, web3State.account, toast])

  return (
    <Container>
      <VStack spacing="20px">
        <Center mt="-5" position="relative">
          <Heading as="h1" size="lg">{nft.title}</Heading>
        </Center>

        <Center>
          <Image
            boxSize="225px"
            objectFit="cover"
            src={nft.cover}
            borderRadius="xl"
          />
        </Center>

        <Center>
          <Button
            onClick={handleBuyButton}
            isFullWidth
            isLoading={isLoading}
            colorScheme="whatsapp"
          >
            {nft.price} ETH
          </Button>
        </Center>
      </VStack>
    </Container>
  )
}

export default Tab2Listed