/* eslint-disable react/jsx-props-no-spreading */
import { Button, FormControl, HStack, Icon, Input } from '@chakra-ui/react'
import { useForm, useWatch } from 'react-hook-form'
import { MdSend } from 'react-icons/md'

import { useWebSocket } from '../hooks/useWebSocket'

interface ChatForm {
  message: string
}

export default function ChatBar() {
  const { sendMessage } = useWebSocket()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isLoading, isSubmitting, isValid },
  } = useForm<ChatForm>()

  const onSubmit = (data: ChatForm) => {
    sendMessage(data.message)
    reset()
  }

  const watchMessage = useWatch({ control, name: 'message' })

  return (
    <HStack
      as="form"
      w="full"
      boxShadow="md"
      rounded="md"
      border="1px solid"
      borderColor="gray.200"
      bg="white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl>
        <Input
          {...register('message', {
            required: true,
            maxLength: 256,
          })}
          type="text"
          placeholder="Type a message"
          border="none"
        />
      </FormControl>
      <Button
        type="submit"
        bg="transparent"
        isLoading={isSubmitting || isLoading}
        isDisabled={!isValid}
        sx={{
          _hover: {
            bg: 'transparent',
            '& svg': {
              color: 'brand.700',
            },
          },
          _active: {
            bg: 'transparent',
          },
        }}
      >
        <Icon as={MdSend} boxSize={6} color={watchMessage && watchMessage.length > 0 ? 'brand.500' : 'gray.400'} />
      </Button>
    </HStack>
  )
}
