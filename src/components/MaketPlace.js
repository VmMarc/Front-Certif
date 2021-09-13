// string title;
// string cover;
// address creator;
// string description;
// uint256 price;
// uint256 date;
// bytes32 gameHash;

import { Container, SimpleGrid } from "@chakra-ui/react"
import { GameKeysContext } from '../App'
import { useState, useEffect, useContext } from "react"
import { Web3Context } from "web3-hooks";
import { ethers } from "ethers";
import NFTListed from "./NFTListed"


const MarketPlace = () => {
  const [web3State] = useContext(Web3Context);
  const [listing, setlisting] = useState([]);
  const { gameKeys } = useContext(GameKeysContext)


  useEffect(() => {
    if (web3State.chainId === 42) {
      const getNFT = async () => {
        try {
          const listingApproved = []
          const totalSupply = await gameKeys.totalSupply()
          for (let i = 1; i <= totalSupply.toString(); i++) {
            const nft = await gameKeys.getCPRById(i)
            const price = await gameKeys.getPrice(i)
            listingApproved.push({
              hash: nft.contentHash,
              content: nft.content,
              title: nft.title,
              author: nft.author,
              url: nft.url,
              timeStamp: nft.timeStamp.toString(),
              id: i,
              price: ethers.utils.formatEther(price),
            })
          }
          setlisting(listingApproved)
        } catch (e) {
          console.log(e.message)
        }
      }
      getNFT()
    }
  }, [CPR, Market, web3State])

  return (
    <Container centerContent maxW="container.xl" py="10">

      <SimpleGrid columns={[1, 1, 1, 2, 3]} gap="8">
        {listing.map((el, index) => {
          return <NFTListed key={index} nft={el}></NFTListed>
        })}
      </SimpleGrid>
    </Container>
  )
}

export default MarketPlace