import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import theme from '../theme'

// Create a client
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
