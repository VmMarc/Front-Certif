import { Center, Heading, SimpleGrid, Button, Text, Spacer } from "@chakra-ui/react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"

const Tab3 = ({ nft }) => {
  return (
    <>
      <Center mt="-4">
        <Heading as="h1" size="lg">{nft.title}</Heading>
      </Center>

      <SimpleGrid columns={1} spacing={4} mt="2" fontSize="1rem" >
        <Center>
          <Text fontWeight="bold">Name</Text>
          <Spacer />
          <Text >{nft.name}</Text>
        </Center>

        <Center>
          <Text fontWeight="bold">NFT id</Text>
          <Spacer />
          <Text >{nft.id}</Text>
        </Center>

        <Center>
          <Text fontWeight="bold">Game creator</Text>
          <Spacer />
          <Text>{nft.creator}</Text>
        </Center>

        <Center>
          <Text fontWeight="bold">Cover</Text>
          <Spacer />
          <Popover>
            <PopoverTrigger>
              <Button>Click</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>{nft.cover}</PopoverBody>
            </PopoverContent>
          </Popover>
        </Center>

        <Center>
          <Text fontWeight="bold">Creation date</Text>
          <Spacer />
          <Text>{nft.date}</Text>
        </Center>

      </SimpleGrid>
    </>
  )
}

export default Tab3