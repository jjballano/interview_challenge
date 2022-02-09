import { ShowInfo } from "../TvShow.types";


type TvMazeInfo = {
  id: number,
  show: {id: number, name: string, url: string, image: {medium: string}}
}

type ListResponse = {response: ShowInfo[]};

const list = async (): Promise<ListResponse> => {
  return fetch('https://api.tvmaze.com/schedule').then(async res => {
    return (await res.clone().json()).map((result: TvMazeInfo) => {
      const tvShow = result.show;
      return {id: tvShow.id, name: tvShow.name, url: tvShow.url, coverUri: tvShow.image?.medium}
    })
  })
}

export default list;