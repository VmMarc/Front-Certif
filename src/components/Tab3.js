import { Center, SimpleGrid, Button, Text, Spacer } from "@chakra-ui/react"
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

      <SimpleGrid columns={1} spacing={4} mt="2" fontSize="1rem" >
        <Center>
          <Text fontWeight="bold">Title</Text>
          <Spacer />
          <Text >{nft.title}</Text>
        </Center>

        <Center>
          <Text fontWeight="bold">Game id</Text>
          <Spacer />
          <Text >{nft.id}</Text>
        </Center>

        <Center>
          <Text fontWeight="bold">Game creator</Text>
          <Spacer />
          <Popover>
            <PopoverTrigger>
              <Button>Click</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>{nft.creator}</PopoverBody>
            </PopoverContent>
          </Popover>
        </Center>

        <Center>
          <Text fontWeight="bold">Description</Text>
          <Spacer />
          <Popover>
            <PopoverTrigger>
              <Button>Click</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>{nft.description}</PopoverBody>
            </PopoverContent>
          </Popover>
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