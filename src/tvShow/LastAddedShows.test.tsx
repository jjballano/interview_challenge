import { screen, waitFor } from '@testing-library/react';
import LastAddedShows from './LastAddedShows';
import { mockGet } from '../test/mocks/server';
import { QueryCache } from 'react-query';
import { renderWithProviders } from '../test/renderUtils';
import userEvent from '@testing-library/user-event';

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

    renderWithProviders(<LastAddedShows></LastAddedShows>, {queryCache});
    
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

    renderWithProviders(<LastAddedShows></LastAddedShows>, {queryCache});

    await waitFor(() => {
      expect(screen.getByText(/^tv show 1$/i)).toBeInTheDocument();
    })
    const image: HTMLImageElement = screen.getByAltText(/^tv show 1 movie cover$/i)
    expect(image).toBeInTheDocument();
    expect(image.src).toEqual("http://image.jpg/")
  });

  test('redirects to tv show info when it is clicked', async () => {
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

    renderWithProviders(<LastAddedShows></LastAddedShows>, {queryCache});

    const image: HTMLImageElement = await screen.findByAltText(/^tv show 1 movie cover$/i);
    userEvent.click(image);

    await waitFor(() => {
      expect(window.location.pathname).toEqual('/tvshow')
      expect(window.location.search).toEqual('?id=1&name=TV%20show%201')
    })
    
  })
})

const queryCache = new QueryCache();