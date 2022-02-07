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
      <>
        <h2>Last Added Shows</h2>
        <TvShowList>
          {
            tvShows?.map(tvShow => 
              <TvShow key={tvShow.id} to={`/tvshow?id=${tvShow.id}&name=${tvShow.name}`}>
                <img src={tvShow.imageUri} alt={`${tvShow.name} movie cover`}></img>
                <p>{tvShow.name}</p>
              </TvShow>              
            ) 
          }
        </TvShowList>
      </>
  );
}

export default LastAddedShows;
