import { render } from "@testing-library/react"
import { QueryCache, QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom";

type Config = {
  path?: string,
  queryCache?: QueryCache
}

export const renderWithProviders = (ui: JSX.Element, {path = '/', queryCache = new QueryCache()}: Config) => {
  
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        cacheTime: 0
      },
    },
    queryCache: queryCache
  });
  window.history.pushState({}, 'Test page', path);

  render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    </BrowserRouter>
  )
}