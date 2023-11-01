import { Avatar, AvatarBadge, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import { useWebSocket } from '../hooks/useWebSocket'

interface UserProps {
  username: string
}

export default function User({ username }: UserProps) {
  const { push } = useRouter()
  const { login } = useWebSocket()

  const onClick = () => {
    if (login === username) {
      return
    }

    push(`/private/${encodeURI(username)}`)
  }

  return (
    <HStack onClick={onClick} cursor={login !== username ? 'pointer' : undefined}>
      <Avatar size="md" name={username}>
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Text>{username}</Text>
    </HStack>
  )
}
