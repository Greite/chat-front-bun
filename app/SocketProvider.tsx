import { createContext, PropsWithChildren, useMemo, useState } from 'react'

import { WebSocketMessage } from '@/src/types/WebSocketMessage'
import uuid from '@/src/utils/uuid'

interface IWebSocket {
  webSocket: WebSocket | undefined
  setWebSocket: (webSocket: WebSocket) => void
  login: string | undefined
  setLogin: (login: string) => void
  channel: number | undefined
  setChannel: (channel: number) => void
  messages: WebSocketMessage[]
  setMessages: (messages: WebSocketMessage[]) => void
  users: WebSocketMessage[]
  setUsers: (users: WebSocketMessage[]) => void
  userId: string
}

export const SocketContext = createContext<IWebSocket>({
  webSocket: undefined,
  setWebSocket: () => {},
  login: undefined,
  setLogin: () => {},
  channel: undefined,
  setChannel: () => {},
  messages: [],
  setMessages: () => {},
  users: [],
  setUsers: () => {},
  userId: '',
})

export function SocketProvider({ children }: PropsWithChildren) {
  const [webSocket, setWebSocket] = useState<WebSocket>()
  const [login, setLogin] = useState<string>()
  const [channel, setChannel] = useState<number>()
  const [messages, setMessages] = useState<WebSocketMessage[]>([])
  const [users, setUsers] = useState<WebSocketMessage[]>([])
  const [userId] = useState<string>(uuid())

  const WebSocketContext = useMemo(
    () => ({
      webSocket,
      setWebSocket,
      login,
      setLogin,
      channel,
      setChannel,
      messages,
      setMessages,
      users,
      setUsers,
      userId,
    }),
    [webSocket, setWebSocket, login, setLogin, channel, setChannel, messages, setMessages, users, setUsers, userId],
  )

  return <SocketContext.Provider value={WebSocketContext}>{children}</SocketContext.Provider>
}
