import { useQuery } from 'react-query';
import requestTvShows from './action/requestTvShows';
import { TvShowList, TvShow } from './LastAddedShows.styles';
import { ShowInfo } from './TvShow.types';

function LastAddedShows() {

  const {data: tvShows, error, isLoading} = useQuery<unknown, unknown, ShowInfo[]>(
      'list', 
      () => requestTvShows(), 
      {cacheTime: 60 * 60 * 1000} //Documentation says that their cache is one hour
  );
  return (
      <>
        <h2>Last Added Shows</h2>
        <TvShowList>
          { error ? <p>Error getting the shows list, please, try later</p> : ''}
          { isLoading ?
            <p>...Loading</p>
            :
            tvShows?.map(tvShow => 
              <TvShow key={tvShow.id} to={`/tvshow/${tvShow.id}?name=${tvShow.name}&cover=${tvShow.coverUri}`}>
                <img src={tvShow.coverUri} alt={`${tvShow.name} movie cover`}></img>
                <p>{tvShow.name}</p>
              </TvShow>              
            ) 
          }
        </TvShowList>
      </>
  );
}

export default LastAddedShows;
