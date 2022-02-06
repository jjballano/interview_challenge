import { QueryClientProvider, QueryClient } from 'react-query';
import {
  Container, SectionTitle, Title, Subtitle,
} from './App.styles';
import LastAddedShows from './tvShow/LastAddedShows';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>    
      <Container>
        <Title>TV Bland</Title>
        <Subtitle>TV Show and web series database.</Subtitle>
        <Subtitle>Create personalised schedules. Episode guide, cast, crew and character information.</Subtitle>
        <SectionTitle>Last Added Shows</SectionTitle>
        <LastAddedShows></LastAddedShows>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
