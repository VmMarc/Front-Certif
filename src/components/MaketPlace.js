// string title;
// string cover;
// address creator;
// string description;
// uint256 price;
// uint256 date;
// bytes32 gameHash;

import { Container, SimpleGrid, Heading } from "@chakra-ui/react"
import { GameKeysContext } from '../App'
import { useState, useEffect, useContext } from "react"
import { Web3Context } from "web3-hooks";
import { ethers } from "ethers";
import NFTListed from "./NFTListed"


const MarketPlace = () => {
  const [web3State] = useContext(Web3Context);
  const [listing, setlisting] = useState([]);
  const gameKeys = useContext(GameKeysContext)


  useEffect(() => {
    if (web3State.chainId === 42) {
      const getGames = async () => {
        try {
          const listingApproved = []
          const totalSupply = await gameKeys.gameTotalSupply()
          for (let i = 1; i <= totalSupply.toString(); i++) {
            const nft = await gameKeys.getGameInfosById(i)
            listingApproved.push({
              title: nft.title,
              cover: nft.cover,
              creator: nft.creator,
              description: nft.description,
              price: ethers.utils.formatEther(nft.price),
              date: nft.date.toString(),
              gameHash: nft.gameHash.toString(),
              gameID: nft.gameID.toString(),
            })
          }
          setlisting(listingApproved)
        } catch (e) {
          console.log(e.message)
        }
      }
      getGames()
    }
  }, [gameKeys, web3State])

  return (
    <Container centerContent maxW="container.xl" py="10">
      <Heading mb="5">Games</Heading>
      <SimpleGrid columns={[1, 1, 1, 2, 3]} gap="8">
        {listing.map((el, index) => {
          return <NFTListed key={index} nft={el}></NFTListed>
        })}
      </SimpleGrid>
    </Container>
  )
}

export default MarketPlace