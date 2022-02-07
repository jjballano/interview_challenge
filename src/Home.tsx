import { QueryClientProvider, QueryClient } from 'react-query';
import {
  Container, Title, Subtitle,
} from './Home.styles';
import LastAddedShows from './tvShow/LastAddedShows';

const queryClient = new QueryClient();

function Home() {
  return (
    <QueryClientProvider client={queryClient}>  
      <Container>
        <Title>TV Bland</Title>
        <Subtitle>TV Show and web series database.</Subtitle>
        <Subtitle>Create personalised schedules. Episode guide, cast, crew and character information.</Subtitle>
        <LastAddedShows></LastAddedShows>
      </Container>
    </QueryClientProvider>
  );
}

export default Home;
