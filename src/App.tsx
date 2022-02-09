import { QueryClientProvider, QueryClient } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import { Body } from './App.styles';
import Home from './Home';
import { HOME, NOT_EXIST, TV_SHOW_INFO } from './Routes';
import TvShowInfo from './tvShow/TvShowInfo';

const queryClient = new QueryClient();

function App() {
  return (
    <Body>
      <QueryClientProvider client={queryClient}>  
        <Routes>
          <Route path={HOME} element={<Home />}/>
          <Route path={TV_SHOW_INFO} element={<TvShowInfo />} />
          <Route path={NOT_EXIST} element={<main>Not found</main>} /> 
          {/* We'd need a better 404 error or redirect to home based on requirements */}
        </Routes>        
      </QueryClientProvider>
    </Body>
  );
}



export default App;
