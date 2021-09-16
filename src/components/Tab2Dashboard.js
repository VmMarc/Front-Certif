import { Center, Heading, Image, Container, VStack } from "@chakra-ui/react"
// import { useContext, useState } from "react"
// import { GameKeysContext } from '../App'
// import { Web3Context } from "web3-hooks";


const Tab2Dashboard = ({ nft }) => {
  // const gameKeys = useContext(GameKeysContext)
  // const [web3State] = useContext(Web3Context);
  // const [isLoading, setIsLoading] = useState(false)


  // const handleGetLicense = async () => {
  //   try {
  //     setIsLoading(true)
  //     let nbLicenses = await gameKeys.balanceOf(web3State.account);
  //     let array2 = [];
  //     for (let i = 0; i < nbLicenses.toString(); i++) {
  //       let licenseIds = await gameKeys.tokenOfOwnerByIndex(web3State.account, i);
  //       array2.push(Number(licenseIds));
  //     }
  //     console.log(array2);
  //     setIsLoading(false)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }


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

        {/* <Button
          isLoading={isLoading}
          loadingText="Adding game creator"
          colorScheme="blue"
          onClick={handleGetLicense}
        >
          Check License
        </Button> */}


      </VStack>
    </Container>
  )
}


export default Tab2Dashboard