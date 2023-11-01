'use client'

import { Flex, HStack, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import ChatBar from '@/src/components/ChatBar'
import Message from '@/src/components/Message'
import User from '@/src/components/User'
import { useWebSocket } from '@/src/hooks/useWebSocket'
import scrollToBottom from '@/src/utils/scrollToBottom'

export default function Channel() {
  const params = useParams()
  const { login, messages, users } = useWebSocket()
  const messagesBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesBoxRef.current) {
      scrollToBottom(messagesBoxRef.current)
    }
  }, [messages])

  return (
    <HStack
      minH="100vh"
      minW="100vw"
      maxH="100vh"
      justifyContent="flex-start"
      alignItems="flex-start"
      bg={useColorModeValue('gray.100', 'gray.800')}
    >
      <VStack
        minW="xs"
        height="100vh"
        gap={4}
        p={4}
        alignItems="flex-start"
        borderRight="1px solid"
        borderRightColor="gray.200"
        overflowY="scroll"
      >
        <User username={login ?? ''} />
        {users.map((user) => (
          <User key={user.id} username={user.username} />
        ))}
      </VStack>
      <VStack flex={1} p={4} height="100vh">
        <Heading as="h1" size="xs" fontWeight="100" color="gray.300" textAlign="center">
          You&apos;re chatting on channel {params.id}
        </Heading>
        <Flex ref={messagesBoxRef} w="full" flexGrow={1} gap={3} flexDirection="column" overflowY="scroll">
          {messages.map((message) => {
            if (message.channel !== parseInt(params.id as string, 10)) {
              return null
            }

            return (
              <Message
                key={message.id}
                username={message.username}
                message={message.content}
                placement={message.username === login ? 'right' : 'left'}
                date={new Date(message.date)}
              />
            )
          })}
        </Flex>
        <ChatBar />
      </VStack>
    </HStack>
  )
}
