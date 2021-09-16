import { Center, Container, Circle } from "@chakra-ui/react"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { useState } from "react"
import Tab2Dashboard from "./Tab2Dashboard"
import Tab3 from "./Tab3"

const DashboardCards = ({ nft }) => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  return (
    <Container backgroundColor="#ff4c54" borderRadius="1rem" height="30rem" width="24rem" >
      <Circle mb="-8" position="relative" bottom="1rem" left="-11rem" size="14" fontWeight="bold" fontSize="40" bg="#78a8ca" color="white">
        {nft.gameID}
      </Circle>

      <Tabs index={tabIndex} onChange={handleTabsChange} variant="soft-rounded" colorScheme="green" defaultIndex={1}>
        <TabPanels>

          <TabPanel >
            <Tab2Dashboard nft={nft} />
          </TabPanel>

          <TabPanel aria-labelledby="2" pb="0">
            <Tab3 nft={nft} />
          </TabPanel>


        </TabPanels>
        <Center>
          <TabList mt="10" mb="5">
            <Tab defaultIndex>Tab</Tab>
            <Tab>Infos</Tab>
          </TabList>
        </Center>
      </Tabs>

    </Container>
  )

}

export default DashboardCards