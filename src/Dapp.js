import { useContext, useEffect, useState } from 'react'
import {
  Alert,
  AlertIcon,
  Input,
  Button,
  Flex,
  Spacer,
  Heading,
  Text,
  HStack,
  Spinner,
  useToast,
  useDisclosure,
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Web3Context } from 'web3-hooks'
import { SimpleStorageContext } from './App'
import { SimpleStorageAddress } from './contracts/SimpleStorage'

function Dapp() {
  const [web3State, login] = useContext(Web3Context)
  const simpleStorage = useContext(SimpleStorageContext)
  const [value, setValue] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, SetInputValue] = useState('')
  const toast = useToast()
  const {
    isOpen: isOpenLogoutModal,
    onOpen: onOpenLogoutModal,
    onClose: onCloseLogoutModal,
  } = useDisclosure()
  const eveAddress = '0x128de69b13Bf0456716920b1D88A017A422A9840'

  // Get storage value when component is mounted
  useEffect(() => {
    if (simpleStorage) {
      const getValue = async () => {
        try {
          const _value = await simpleStorage.getData()
          setValue(_value)
        } catch (e) {
          console.log(e)
        }
      }
      getValue()
    }
  }, [simpleStorage])

  // Listen to DataSet event and react with a state change
  useEffect(() => {
    // si simpleStorage est pas null alors
    if (simpleStorage) {
      const cb = (account, str) => {
        setValue(str)
        if (account.toLowerCase() !== web3State.account.toLowerCase()) {
          toast({
            title: 'Event DataSet',
            description: `${account} set storage with value: ${str}`,
            status: 'info',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          })
        }
      }
      // ecouter sur l'event DataSet
      simpleStorage.on('DataSet', cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        simpleStorage.off('DataSet', cb)
      }
    }
  }, [simpleStorage, web3State.account, toast])

  // Listen to DataSet event, and if initiator of the transaction is
  // 0x128de69b13Bf0456716920b1D88A017A422A9840 then pop a toast
  useEffect(() => {
    // si simpleStorage est pas null alors
    if (simpleStorage) {
      const cb = (account, str) => {
        setValue(str)
        if (account.toLowerCase() !== web3State.account.toLowerCase()) {
          toast({
            title: 'Eve made a transatcion',
            description: `${account} set storage with value: ${str}`,
            status: 'warning',
            position: 'top-left',
            duration: 9000,
            isClosable: true,
          })
        }
      }

      // Filter for DataSet events with account equal to 0x128de69b13Bf0456716920b1D88A017A422A9840
      const eveFilter = simpleStorage.filters.DataSet(eveAddress)

      // ecouter sur l'event DataSet avec le filter eveFilter appliqué
      simpleStorage.on(eveFilter, cb)
      return () => {
        // arreter d'ecouter lorsque le component sera unmount
        simpleStorage.off(eveFilter, cb)
      }
    }
  }, [simpleStorage, web3State.account, toast])

  const handleOnClickLogin = () => {
    if (!web3State.isLogged) {
      login()
    } else {
    }
  }

  const handleClickSetStorage = async () => {
    try {
      setIsLoading(true)
      let tx = await simpleStorage.setData(inputValue)
      await tx.wait()
      setIsLoading(false)
      toast({
        title: 'Confirmed transaction',
        description: `storage is set wiht value: ${inputValue}\nTransaction hash: ${tx.hash}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (e) {
      setIsLoading(false)
      if (e.code === 4001) {
        toast({
          title: 'Transaction signature denied',
          description: 'You denied transaction signature.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      console.log(e)
    }
  }

  return (
    <>
      <Modal isOpen={isOpenLogoutModal} onClose={onCloseLogoutModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout from a Dapp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You can not logout from a Dapp.</Text>
            <Text>
              Disconnect your MetaMask from this website if you want to logout.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onCloseLogoutModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex flexDirection="column" alignItems="center" m={4} h="300px">
        <Flex
          justifyContent="space-between"
          width="100%"
          mb={4}
          alignItems="center"
        >
          <Heading size="xl">SimpleStorage</Heading>
          <Button
            colorScheme="teal"
            onClick={() =>
              !web3State.isLogged ? handleOnClickLogin() : onOpenLogoutModal()
            }
          >
            {!web3State.isLogged ? 'Log in' : 'Log out'}
          </Button>
        </Flex>
        <Heading size="m" as="i" alignSelf="flex-start">
          Deployed on Rinkeby at {SimpleStorageAddress}
        </Heading>
        <Spacer />
        {!simpleStorage ? (
          <Spinner
            size="xl"
            label="Connecting to Ethereum"
            color="blue.500"
            emptyColor="gray.200"
          />
        ) : (
          <>
            {web3State.chainId === 4 ? (
              <>
                <Text as="b" fontSize="30">
                  value: {value}
                </Text>
                <HStack>
                  <Input
                    width="50"
                    value={inputValue}
                    placeholder="storage value to set"
                    onChange={(event) => SetInputValue(event.target.value)}
                  />
                  <Button
                    isLoading={isLoading}
                    loadingText="setting storage"
                    colorScheme="teal"
                    onClick={handleClickSetStorage}
                  >
                    set storage
                  </Button>
                </HStack>
              </>
            ) : (
              <Alert status="error">
                <AlertIcon />
                You are on the wrong network please switch to Rinkeby
              </Alert>
            )}
          </>
        )}
      </Flex>
    </>
  )
}

export default Dapp
