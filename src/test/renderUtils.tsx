import { render } from "@testing-library/react"
import { QueryCache, QueryClient, QueryClientProvider } from "react-query"
import { MemoryRouter, Route, Routes } from "react-router-dom";

type Config = {
  routes?: {path: string, ui?: JSX.Element}[],
  path?: string,
  queryCache?: QueryCache,
  addRoutes?: boolean
}

export const renderWithProviders = (ui: JSX.Element, {routes, path = '/', addRoutes = true, queryCache = new QueryCache()}: Config) => {
  
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
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]} >
        {
          addRoutes ? 
          <Routes>
            {
              routes?.length ?
                routes?.map(route => (
                  <Route path={route.path} element={route.ui || ui} key={route.path}/>
                ))
                :
                <Route path={path} element={ui}></Route>
            }
          </Routes>
          : 
          ui
        }
      </MemoryRouter>,
    </QueryClientProvider>
  )
}