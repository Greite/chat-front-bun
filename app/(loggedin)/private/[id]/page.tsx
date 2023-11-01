'use client'

import { Flex, HStack, Heading, VStack, useColorModeValue } from '@chakra-ui/react'
import { useParams } from 'next/navigation'

import ChatBar from '@/src/components/ChatBar'
import Message from '@/src/components/Message'
import User from '@/src/components/User'

export default function Private() {
  const params = useParams()
  const username = decodeURI(params.id as string)

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
        <User username="Greite Turtle" />
        <User username={username} />
      </VStack>
      <VStack flex={1} p={4} height="100vh">
        <Heading as="h1" size="xs" fontWeight="100" color="gray.300" textAlign="center">
          You&apos;re chatting with {username}
        </Heading>
        <Flex w="full" flexGrow={1} gap={3} flexDirection="column" overflowY="scroll">
          <Message
            username={username}
            message="Le message du mec en face"
            placement="left"
            date={new Date(Math.floor(Math.random() * Date.now()))}
          />
          <Message message="Mon message" placement="right" date={new Date(Math.floor(Math.random() * Date.now()))} />
          <Message message="Mon message" placement="right" date={new Date(Math.floor(Math.random() * Date.now()))} />
          <Message message="Mon message" placement="right" date={new Date(Math.floor(Math.random() * Date.now()))} />
          <Message message="Mon message" placement="right" date={new Date(Math.floor(Math.random() * Date.now()))} />
          <Message message="Mon message" placement="right" date={new Date(Math.floor(Math.random() * Date.now()))} />
          <Message message="Mon message" placement="right" date={new Date(Math.floor(Math.random() * Date.now()))} />
          <Message message="Mon message" placement="right" date={new Date(Math.floor(Math.random() * Date.now()))} />
          <Message message="Mon message" placement="right" date={new Date(Math.floor(Math.random() * Date.now()))} />
        </Flex>
        <ChatBar />
      </VStack>
    </HStack>
  )
}
