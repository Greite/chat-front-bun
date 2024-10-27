/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { MdClose, MdDehaze, MdLogout, MdSyncAlt } from 'react-icons/md'

import { useWebSocket } from '../hooks/useWebSocket'
import channelValidationRules from '../utils/validation/channelValidationRules'

interface ChannelForm {
  channel: number
}

export default function OptionsDrawer(): JSX.Element {
  const { closeWebSocket, setChannel } = useWebSocket()
  const { isOpen, onToggle } = useDisclosure()
  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isValid },
  } = useForm<ChannelForm>()

  const onSubmit = (data: ChannelForm) => {
    const channel = parseInt(data.channel.toString(), 10)
    setChannel(channel)
    push(`/channel/${channel}`)
  }

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
            <HStack mt={6} pt={4} spacing={4}>
              <Box as="form" onSubmit={handleSubmit(onSubmit)} w="full">
                <FormControl isInvalid={!!errors.channel?.message}>
                  <FormLabel>Change channel</FormLabel>
                  <InputGroup>
                    <Input
                      {...register('channel', channelValidationRules)}
                      type="number"
                      placeholder="2796"
                      min={1}
                      max={9999}
                    />
                    <InputRightElement>
                      <Button
                        sx={{
                          '.chakra-button__icon': {
                            mr: 0,
                          },
                        }}
                        leftIcon={<Icon as={MdSyncAlt} boxSize={6} />}
                        type="submit"
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.channel?.message}</FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
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
