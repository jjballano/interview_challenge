import { useQuery } from 'react-query';
import requestTvShows, {ShowData} from './action/requestTvShows';
import { TvShowList, TvShow } from './LastAddedShows.styles';

function LastAddedShows() {

  const {data: tvShows} = useQuery<unknown, unknown, ShowData[]>(
      'list', 
      () => requestTvShows(), 
      {cacheTime: 60 * 60 * 1000} //Documentation says that their cache is one hour
  );
  return (
      <TvShowList>
        {
          tvShows?.map(tvShow => 
            <TvShow key={tvShow.id} className='hijos'>
              <img src={tvShow.imageUri} alt={`${tvShow.name} movie cover`}></img>
              <p>{tvShow.name}</p>
            </TvShow>
          ) 
        }
      </TvShowList>
  );
}

export default LastAddedShows;
