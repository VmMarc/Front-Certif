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
    <Container backgroundColor="purple.400" borderRadius="3rem" height="30rem" width="24rem" >
      <Circle mb="-8" position="relative" bottom="1rem" left="-11rem" size="16" fontWeight="bold" fontSize="40" bg="tomato" color="white">
        {nft.id}
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
            <Tab defaultIndex>Tab 2</Tab>
            <Tab>infos</Tab>
          </TabList>
        </Center>
      </Tabs>

    </Container>
  )

}

export default DashboardCards