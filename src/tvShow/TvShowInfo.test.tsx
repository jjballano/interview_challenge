import TvShowInfo from './TvShowInfo';
import { renderWithProviders } from '../test/renderUtils';
import { screen, waitFor} from '@testing-library/react';
import { mockGet } from '../test/mocks/server';
import { TvMazeShowInfo } from './action/requestTvShowById';

//I'm not doing all the tests that I'd do, I just want to show how I approach testing
describe('Tv Show Info', () => {
  beforeEach(() => {
    mockGet('/shows/11', (_, res, ctx)=> {
      return res(
        ctx.json(showInfoWith({}))
        )
      }
    );
  });
  it('renders the name of the show received in the url', () => {
    const {name} = showInfoWith({});
    renderWithProviders(<TvShowInfo />, {routes: [{path: '/thepath/:id'}], path: `/thepath/11?name=${name}`});

    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it('renders the cover image', () => {
    const queryParams = 'cover=http://image.jpg&name=the%20tv%20show%20name'
    renderWithProviders(<TvShowInfo />, {routes: [{path: '/thepath/:id'}], path: `/thepath/11?${queryParams}`});

    const image: HTMLImageElement = screen.getByAltText(/^the tv show name movie cover$/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toEqual("http://image.jpg/");
  });

  it('does not render the cover image if it is not received as a query param', () => {
    const queryParams = 'cover=&name=the%20tv%20show%20name'
    renderWithProviders(<TvShowInfo />, {routes: [{path: '/thepath/:id'}], path: `/thepath/11?${queryParams}`});

    expect(screen.queryByAltText(/^the tv show name movie cover$/i)).not.toBeInTheDocument();
  });

  it('changes the show name if the one received is different', async () => {
    mockGet('/shows/123', (_, res, ctx)=> {
      return res(
        ctx.json(showInfoWith({name: "different name"}))
        )
      }
    );
      
    const queryParams = 'name=oldname'
    renderWithProviders(<TvShowInfo />, {routes: [{path: '/thepath/:id'}], path: `/thepath/123?${queryParams}`});

    await waitFor(() => {
      expect(screen.getByText('different name')).toBeInTheDocument();
    })
    expect(screen.queryByText('oldname')).not.toBeInTheDocument();
  })

  it('renders the summary', async () => {
    mockGet('/shows/123', (_, res, ctx)=> {
      return res(
        ctx.json(showInfoWith({summary: "<b>Summary with html content</b>"}))
        )
      }
    );
      
    renderWithProviders(<TvShowInfo />, {routes: [{path: '/thepath/:id'}], path: `/thepath/123`});

    await waitFor(() => {
      expect(screen.getByText(/^Summary with html content$/)).toBeInTheDocument();
    })
  })
});

const showInfoWith = (info: Partial<TvMazeShowInfo>): TvMazeShowInfo => {
  return {...{
    id: 1,
    name: `TV show 1`,
    rating: {
      average: 1
    },
    status: "Running",
    schedule: {
      days: [
        "Sunday"
      ]
    },
    genres: [],
    network: {
      name: "CBS"
    },
    image: {
      medium: "http://image.jpg"
    },
    summary: "<p><b>The summary with html</b></p>",
    _embedded: {
      cast: [
        {
          person: {
            name: "Jane Pauley"
          },
          character: {
            name: "Mary"
          }
        },
        {
          person: {
            name: "Charles Kuralt"
          },
          character: {
            name: "John"
          }
        }
      ]
    }
  }, ...info};
}