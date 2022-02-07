import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './test/renderUtils';

describe('Router', () => {
  test('redirects to home when path is /', () => {
    renderWithProviders(<App></App>, {path: '/'});

    expect(screen.getByText(/last added shows/i)).toBeInTheDocument();
  })

  test('redirects to show info when url is /tvshow/**', () => {
    renderWithProviders(<App></App>, {path: '/tvshow?name=the+show+name'});

    expect(screen.getByText(/the show name/i)).toBeInTheDocument();
  })
})
