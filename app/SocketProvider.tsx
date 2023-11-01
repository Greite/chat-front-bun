import { createContext, PropsWithChildren, useMemo, useState } from 'react'

import { WebSocketMessage } from '@/src/types/WebSocketMessage'

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
})

export function SocketProvider({ children }: PropsWithChildren) {
  const [webSocket, setWebSocket] = useState<WebSocket>()
  const [login, setLogin] = useState<string>()
  const [channel, setChannel] = useState<number>()
  const [messages, setMessages] = useState<WebSocketMessage[]>([])
  const [users, setUsers] = useState<WebSocketMessage[]>([])

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
    }),
    [webSocket, setWebSocket, login, setLogin, channel, setChannel, messages, setMessages, users, setUsers],
  )

  return <SocketContext.Provider value={WebSocketContext}>{children}</SocketContext.Provider>
}
