import Header from "./components/Header";
import Admin from "./components/Admin";
import MarketPlace from "./components/MarketPlace";
import GameCreator from "./components/GameCreator";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
// import { Web3Context } from 'web3-hooks'
// import { GameKeysContext } from "./App"
// import { useContext, useState } from 'react'

function Dapp() {
  // const [web3State] = useContext(Web3Context)
  // const gameKeys = useContext(GameKeysContext)
  // const [userRole, setUserRole] = useState("")

  // useEffect(() => {
  //   console.log("gameKeys", gameKeys)
  //   const roles = async () => {
  //     const isGameCreator = await gameKeys.isGameCreator(web3State.account.toLowerCase())
  //     const isAdmin = await gameKeys.isAdmin(web3State.account.toLowerCase())
  //     if (isAdmin)
  //       setUserRole("admin")
  //     else if (isGameCreator)
  //       setUserRole("gameCreator")
  //     else
  //       setUserRole("")

  //     console.log("userRole", userRole)
  //     console.log("isAdmin", isAdmin)
  //     console.log("isGameCreator", isGameCreator)
  //   }
  //   if (gameKeys) {
  //     roles()
  //   }
  // }, [web3State.account, userRole])

  return (
    <div>
      <Header />
      <main>
        <Tabs align="center" variant="soft-rounded" colorScheme="teal" >
          <TabList >
            <Tab borderWidth="4px" m="2rem" fontSize="2xl">
              MarketPlace
            </Tab>

            <Tab borderWidth="4px" m="2rem" fontSize="2xl">
              Dashboard
            </Tab>

            {/* {!gameKeys.isGameCreator(web3State.account.toLowerCase()) ? (<Tab isDisabled borderWidth="4px" m="2rem" fontSize="2xl">
              GameCreator
            </Tab>) : (<Tab borderWidth="4px" m="2rem" fontSize="2xl">
              GameCreator
            </Tab>)} */}

            <Tab borderWidth="4px" m="2rem" fontSize="2xl">
              GameCreator
            </Tab>

            <Tab borderWidth="4px" m="2rem" fontSize="2xl">
              Admin
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <MarketPlace />
            </TabPanel>

            <TabPanel>
              <Dashboard />
            </TabPanel>

            <TabPanel>
              <GameCreator />
            </TabPanel>

            <TabPanel >
              <Admin />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </main>
    </div >

  );
}

export default Dapp;