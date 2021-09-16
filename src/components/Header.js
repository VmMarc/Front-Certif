import { Web3Context } from "web3-hooks";
import { useContext } from "react";
import { Button, useColorMode, Stack } from "@chakra-ui/react";
import { Box, Text, Heading, useDisclosure, Flex } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";


function Header({ title, desc, ...rest }) {
  const [web3State, login] = useContext(Web3Context);
  const { toggleColorMode } = useColorMode();
  const { isOpen: isOpenLogoutModal, onOpen: onOpenLogoutModal, onClose: onCloseLogoutModal } = useDisclosure();

  const handleClickLogin = () => {
    if (!web3State.isLogged) {
      login();
    } else {
    }
  };


  return (
    <Flex>
      <Modal isOpen={isOpenLogoutModal} onClose={onCloseLogoutModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log out from a Dapp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You can not log out from a Dapp.</Text>
            <Text>If you want to log out of this website, do it directly from MetaMask.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onCloseLogoutModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        p={-5}
        shadow="lg"
        borderWidth="1px"
        flex="1"
        borderRadius="md"
        {...rest}
        w="100%"
        h="100px"
        bgGradient="linear(to-l, #97266D, #DD6B20)"
        direction="row" spacing={6} justifyContent="space-between" px={8} pt={3}
      >
        <Stack direction="row" spacing={6} justifyContent="space-between" px={8} pt={3}>
          <Button
            colorScheme="whatsapp"
            onClick={() => (!web3State.isLogged ? handleClickLogin() : onOpenLogoutModal())}
          >
            {!web3State.isLogged ? "Log in" : web3State.chainId === 42 ?
              web3State.account.split("").splice(0, 6).join("") + "..." +
              web3State.account.split("").splice(-4).join("") : (<p style={{ color: "red" }}>WRONG NETWORK USE KOVAN</p>)}
          </Button>

          <Box >
            <Heading>
              <Text
                alignItems="center"
                bg="white"
                bgClip="text"
                fontSize="4xl"
                fontWeight="extrabold"
              >
                GameKeys
              </Text>
            </Heading>
          </Box>


          <Button colorScheme="whatsapp" onClick={toggleColorMode}>
            Dark Mode
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Header;