import { render, screen, waitFor } from '@testing-library/react';
import LastAddedShows from './LastAddedShows';
import { mockGet } from '../mocks/server';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';

describe("Last added tv shows", () => {
  afterEach(() => {
    queryCache.clear();
  });

  test('shows a list with all shows received', async () => {
    mockGet('/schedule', (_, res, ctx)=> {
      return res(
          ctx.json([1,2].map((id) => (
            {
              show: {
                "id": id,
                "name": `TV show ${id}`
              }
            }
          )))
        )
      }
    );
    renderApp();
    await waitFor(() => {
      expect(screen.getAllByText(/^tv show \d$/i)).toHaveLength(2);
    })
    expect(screen.getByText(/^tv show 1$/i)).toBeInTheDocument();
    expect(screen.getByText(/^tv show 2$/i)).toBeInTheDocument();
  });

  test('shows the expected info for each show', async () => {
    mockGet('/schedule', (_, res, ctx)=> {
      return res(
          ctx.json([
            {show: {
              id: 1,
              url: "https://theUrl.com/1",
              name: "TV show 1",
              image: {
                medium: "http://image.jpg"
              }
            }}
          ])
        )
      }
    );
    renderApp();
    await waitFor(() => {
      expect(screen.getByText(/^tv show 1$/i)).toBeInTheDocument();
    })
    const image: HTMLImageElement = screen.getByAltText(/^tv show 1 movie cover$/i)
    expect(image).toBeInTheDocument();
    expect(image.src).toEqual("http://image.jpg/")
  });
})

const queryCache = new QueryCache();

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

const renderApp = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <LastAddedShows></LastAddedShows>
    </QueryClientProvider>
  )
}