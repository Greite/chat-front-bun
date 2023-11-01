/* eslint-disable react/jsx-props-no-spreading */

'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  Icon,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { MdLogin } from 'react-icons/md'

import { useWebSocket } from '@/src/hooks/useWebSocket'
import channelValidationRules from '@/src/utils/validation/channelValidationRules'

interface LoginForm {
  username: string
  channel: number
}

export default function SignupCard() {
  const { push } = useRouter()

  const { setLogin, setChannel } = useWebSocket()

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isValid },
  } = useForm<LoginForm>()

  const onSubmit = (data: LoginForm) => {
    const channel = parseInt(data.channel.toString(), 10)
    setLogin(data.username)
    setChannel(channel)
    push(`/channel/${channel}`)
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('gray.100', 'gray.800')}>
      <Stack spacing={8} mx="auto" maxW="lg" minW="md" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Enter the chat
          </Heading>
          <Text fontSize="lg" color="gray.600">
            and enjoy all our cool features ✌️
          </Text>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
            <FormControl isInvalid={!!errors.username?.message}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                {...register('username', {
                  required: 'Please enter a username',
                })}
                placeholder="Jean-Michel Tractopelle"
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.channel?.message}>
              <FormLabel>Channel</FormLabel>
              <Input
                {...register('channel', channelValidationRules)}
                type="number"
                placeholder="2796"
                min={1}
                max={9999}
              />
              <FormErrorMessage>{errors.channel?.message}</FormErrorMessage>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                loadingText="Submitting"
                size="lg"
                isLoading={isSubmitting || isLoading}
                isDisabled={!isValid}
                leftIcon={<Icon as={MdLogin} boxSize={6} />}
              >
                Enter
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
