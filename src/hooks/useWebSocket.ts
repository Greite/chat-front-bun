import { useToast } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'

import { WebSocketMessage } from '../types/WebSocketMessage'
import WebSocketMessageType from '../types/WebSocketMessageType'
import uuid from '../utils/uuid'

import { SocketContext } from '@/app/SocketProvider'

// eslint-disable-next-line import/prefer-default-export
export const useWebSocket = () => {
  const { webSocket, setWebSocket, login, setLogin, channel, setChannel, messages, setMessages, users, setUsers } =
    useContext(SocketContext)
  const toast = useToast()

  useEffect(() => {
    if (webSocket || !login || !channel) {
      return
    }

    const ws = new WebSocket(`ws://gauthierpainteaux.fr:3002/chat?username=${encodeURI(login)}&channel=${channel}`)
    setWebSocket(ws)
  }, [login, channel, setWebSocket, webSocket])

  useEffect(() => {
    if (!webSocket || !login || !channel) {
      return () => {}
    }

    const onClose = () => {
      setTimeout(() => {
        const ws = new WebSocket(`ws://gauthierpainteaux.fr:3002/chat?username=${encodeURI(login)}&channel=${channel}`)
        setWebSocket(ws)
      }, 5000)
    }

    webSocket.addEventListener('close', onClose)

    return () => {
      webSocket.removeEventListener('close', onClose)
    }
  }, [webSocket, login, channel, setWebSocket])

  useEffect(() => {
    if (!webSocket || !login || !channel) {
      return () => {}
    }

    const onAppClose = () => {
      const data: WebSocketMessage = {
        id: uuid(),
        type: WebSocketMessageType.Leave,
        content: '',
        username: login ?? '',
        date: new Date(),
        channel: channel ?? 0,
      }
      webSocket.send(JSON.stringify(data))
      webSocket.close()
    }

    // @ts-expect-error - window is indeed defined
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    window.addEventListener('beforeunload', onAppClose)

    return () => {
      // @ts-expect-error - window is indeed defined
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      window.removeEventListener('beforeunload', onAppClose)
    }
  }, [webSocket, login, channel])

  useEffect(() => {
    if (!webSocket) {
      return
    }

    switch (webSocket.readyState) {
      case WebSocket.CLOSING:
      case WebSocket.CLOSED:
        toast({
          title: 'Connection lost',
          description: 'Trying to reconnect...',
          status: 'error',
          duration: null,
          isClosable: false,
        })
        break

      default:
        break
    }
  }, [toast, webSocket])

  const sendMessage = (message: string) => {
    if (!webSocket || webSocket.readyState !== WebSocket.OPEN) {
      return
    }

    const data: WebSocketMessage = {
      id: uuid(),
      type: WebSocketMessageType.Message,
      content: message,
      username: login ?? '',
      date: new Date(),
      channel: channel ?? 0,
    }

    messages.push(data)
    setMessages([...messages])

    webSocket.send(JSON.stringify(data))
  }

  const receiveMessage = (data: WebSocketMessage) => {
    const exists = messages.find((message) => message.id === data.id)

    if (exists) {
      return
    }

    messages.push(data)
    setMessages([...messages])
  }

  const userLoggedIn = (data: WebSocketMessage) => {
    const alreadyLoggedIn = users.find((user) => user.id === data.id)

    if (alreadyLoggedIn) {
      return
    }

    toast({
      title: 'New user',
      description: `${data.username} joined the channel`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })

    users.push(data)
    setUsers([...users])
  }

  const userLoggedOut = (data: WebSocketMessage) => {
    const alreadyLoggedOut = users.find((user) => user.id === data.content)

    if (!alreadyLoggedOut) {
      return
    }

    toast({
      title: 'User left',
      description: `${data.username} left the channel`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })

    // pop the user from the array
    users.splice(users.indexOf(alreadyLoggedOut), 1)
    setUsers([...users])
  }

  useEffect(() => {
    if (!webSocket || !login || !channel) {
      return () => {}
    }

    const onEvent = (event: MessageEvent) => {
      const data = JSON.parse(event.data as string) as WebSocketMessage

      switch (data.type) {
        case WebSocketMessageType.Message:
          receiveMessage(data)
          break
        case WebSocketMessageType.Join:
          userLoggedIn(data)
          break
        case WebSocketMessageType.Leave:
          userLoggedOut(data)
          break
        default:
          break
      }
    }

    webSocket.addEventListener('message', onEvent)

    return () => {
      webSocket.removeEventListener('message', onEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webSocket, login, channel, messages, users])

  return {
    sendMessage,
    setLogin,
    login,
    channel,
    setChannel,
    messages,
    users,
  }
}
