import { QueryClientProvider, QueryClient } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import TvShowInfo from './tvShow/TvShowInfo';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tvshow" element={<TvShowInfo />} />
        <Route path="*" element={<main>Not found</main>} /> 
        {/* We'd need a better 404 error or redirect to home based on requirements */}
      </Routes>        
    </QueryClientProvider>
  );
}

export default App;
