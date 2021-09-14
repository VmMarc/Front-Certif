import Header from "./components/Header";
import Admin from "./components/Admin";
import MarketPlace from "./components/MaketPlace";
import GameCreator from "./components/GameCreator";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function Dapp() {
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