import { Center, Heading, Image, Container, VStack } from "@chakra-ui/react"


const Tab2Dashboard = ({ nft }) => {

  return (
    <Container>
      <VStack spacing="20px">
        <Center mt="-5" position="relative">
          <Heading as="h1" size="lg">{nft.title}</Heading>
        </Center>

        <Center>
          <Image
            boxSize="200px"
            objectFit="cover"
            src={nft.cover}
            borderRadius="xl"
          />
        </Center>


      </VStack>
    </Container>
  )
}

export default Tab2Dashboard