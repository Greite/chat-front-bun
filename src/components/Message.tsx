import { Box, HStack, Text, useDisclosure } from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/en'

dayjs.extend(relativeTime)

interface MessageProps {
  message: string
  placement: 'left' | 'right'
  username?: string
  date?: Date
}

export default function Message({ username, message, placement, date }: MessageProps) {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <HStack justifyContent={placement === 'right' ? 'flex-end' : 'flex-start'}>
      <Box onClick={onToggle}>
        {placement === 'left' && (
          <Text fontSize="sm" mx={2}>
            {username}
          </Text>
        )}
        <Box
          w="fit-content"
          px={4}
          py={2}
          rounded="3xl"
          bg={placement === 'right' ? 'brand.500' : 'white'}
          borderEndEndRadius={placement === 'right' ? 0 : '3xl'}
          borderEndStartRadius={placement === 'left' ? 0 : '3xl'}
          wordBreak="break-word"
        >
          <Text fontSize="md" color={placement === 'right' ? 'white' : 'black'}>
            {message}
          </Text>
        </Box>
        {date && isOpen && (
          <Text fontSize="xs" mx={2} textAlign={placement}>
            {dayjs(date).fromNow()}
          </Text>
        )}
      </Box>
    </HStack>
  )
}
