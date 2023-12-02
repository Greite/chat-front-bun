import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  Icon,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { MdClose, MdDehaze, MdLogout } from 'react-icons/md'

import { useWebSocket } from '../hooks/useWebSocket'

export default function OptionsDrawer(): JSX.Element {
  const { closeWebSocket } = useWebSocket()
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Button
        sx={{
          position: 'fixed',
          zIndex: 1401,
          top: '15px',
          right: '15px',
          px: 2,
          '.chakra-button__icon': {
            mr: 0,
          },
        }}
        leftIcon={<Icon as={isOpen ? MdClose : MdDehaze} boxSize={6} />}
        onClick={onToggle}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onToggle}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('gray.100', 'gray.800')}>
          <DrawerHeader py={6} borderBottom="1px solid" borderBottomColor="gray.200">
            <Heading as="h2" size="md" fontWeight="700" color="gray.400">
              Options
            </Heading>
          </DrawerHeader>
          <DrawerBody>
            <HStack mt={6} pt={4} spacing={4} />
          </DrawerBody>
          <DrawerFooter py={4} borderTop="1px solid" borderTopColor="gray.200">
            <Button
              sx={{
                '.chakra-button__icon': {
                  mr: 0,
                },
              }}
              leftIcon={<Icon as={MdLogout} boxSize={6} />}
              onClick={closeWebSocket}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
