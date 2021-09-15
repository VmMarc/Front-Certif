import DashboardCards from "./DashboardCards"
import { Container, SimpleGrid, Heading } from "@chakra-ui/react"
import { GameKeysContext } from '../App'
import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react"
import { Web3Context } from "web3-hooks";

const Dashboard = () => {
  let [dashboard, setDashboard] = useState([])
  const gameKeys = useContext(GameKeysContext)
  const [web3State] = useContext(Web3Context);

  useEffect(() => {
    if (web3State.chainId === 42) {
      const getLicence = async () => {
        const licensesOwned = []
        const totalSupply = await gameKeys.totalSupply()
        for (let i = 1; i <= totalSupply.toString(); i++) {
          let owner = await gameKeys.ownerOf(i)
          if (owner.toLowerCase() === web3State.account) {
            const nft = await gameKeys.getGameInfosById(i)
            licensesOwned.push({
              title: nft.title,
              cover: nft.cover,
              creator: nft.creator,
              description: nft.description,
              price: ethers.utils.formatEther(nft.price),
              date: nft.date.toString(),
              gameHash: nft.gameHash.toString(),
              id: i,
            })
          }
        }
        setDashboard(licensesOwned)
      }

      try {
        getLicence()
      } catch (e) {
        console.log(e)
      }
    }
  }, [gameKeys, web3State])


  return (
    <Container centerContent maxW="container.xl" py="10">
      <Heading mb="5">Your game licenses</Heading>
      <SimpleGrid columns={[1, 1, 1, 2, 3]} gap="8">
        {dashboard.map((el, index) => {
          return <DashboardCards key={index} nft={el}></DashboardCards>
        })}
      </SimpleGrid>
    </Container>
  )
}

export default Dashboard