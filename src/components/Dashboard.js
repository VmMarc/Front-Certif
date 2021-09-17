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
        let licensesOwned = [];
        let nbLicenses = await gameKeys.balanceOf(web3State.account);
        let array2 = [];
        for (let i = 0; i < nbLicenses.toString(); i++) {
          let licenseIds = await gameKeys.tokenOfOwnerByIndex(web3State.account, i);
          let licencesToGames = await gameKeys.getGameByLicenceId(licenseIds)
          array2.push(Number(licencesToGames));
        }
        console.log(array2);
        for await (let elem of array2) {
          console.log(elem);
          let nft = await gameKeys.getGameInfosById(elem);
          console.log(nft);
          licensesOwned.push({
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
        setDashboard(licensesOwned);
      }
      try {
        getLicence()
      } catch (e) {
        console.log(e)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameKeys, web3State])


  return (
    <Container centerContent maxW="container.xl" py="10">
      <Heading mb="5">Your game licenses</Heading>
      <SimpleGrid columns={[1, 1, 1, 2, 3]} gap="8">
        {dashboard.map((elem, index) => {
          return <DashboardCards key={index} nft={elem}></DashboardCards>
        })}
      </SimpleGrid>
    </Container>
  )
}

export default Dashboard