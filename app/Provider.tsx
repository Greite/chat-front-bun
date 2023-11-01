'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

import { SocketProvider } from './SocketProvider'

import theme from '~theme/theme'

export default function Provider({ children }: PropsWithChildren) {
  return (
    <SocketProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </SocketProvider>
  )
}
