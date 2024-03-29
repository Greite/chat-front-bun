import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const theme = {
  colors: {
    brand: {
      '50': '#f5f5ff',
      '100': '#ebeaff',
      '200': '#d0d0ff',
      '300': '#b4b4ff',
      '400': '#7d7cff',
      '500': '#5451a5',
      '600': '#4b47a0',
      '700': '#403c8b',
      '800': '#353274',
      '900': '#2b2a5e',
    },
    gray: {
      '50': '#f5f5f5',
      '100': '#ebebeb',
      '200': '#d0d0d0',
      '300': '#b4b4b4',
      '400': '#7d7d7d',
      '500': '#545454',
      '600': '#4b4b4b',
      '700': '#403f3f',
      '800': '#353535',
      '900': '#2b2b2b',
    },
    blackAlpha: {
      '50': 'rgba(0, 0, 0, 0.04)',
      '100': 'rgba(0, 0, 0, 0.06)',
      '200': 'rgba(0, 0, 0, 0.08)',
      '300': 'rgba(0, 0, 0, 0.16)',
      '400': 'rgba(0, 0, 0, 0.24)',
      '500': 'rgba(0, 0, 0, 0.36)',
      '600': 'rgba(0, 0, 0, 0.48)',
      '700': 'rgba(0, 0, 0, 0.64)',
      '800': 'rgba(0, 0, 0, 0.80)',
      '900': 'rgba(0, 0, 0, 0.92)',
    },
    whiteAlpha: {
      '50': 'rgba(255, 255, 255, 0.04)',
      '100': 'rgba(255, 255, 255, 0.06)',
      '200': 'rgba(255, 255, 255, 0.08)',
      '300': 'rgba(255, 255, 255, 0.16)',
      '400': 'rgba(255, 255, 255, 0.24)',
      '500': 'rgba(255, 255, 255, 0.36)',
      '600': 'rgba(255, 255, 255, 0.48)',
      '700': 'rgba(255, 255, 255, 0.64)',
      '800': 'rgba(255, 255, 255, 0.80)',
      '900': 'rgba(255, 255, 255, 0.92)',
    },
  },
}

export default extendTheme(theme, withDefaultColorScheme({ colorScheme: 'brand' }))
