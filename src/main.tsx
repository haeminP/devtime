import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './i18n'         // initialize i18n before anything renders
import './index.css'
import App from './App.tsx'

/**
 * QueryClient configuration:
 * - retry: false — don't auto-retry failed requests (we handle errors ourselves)
 * - refetchOnWindowFocus: false — don't re-fetch when user switches tabs
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
