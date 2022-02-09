import { ShowInfo } from "../TvShow.types";

const showInfo = async (id?: string): Promise<ShowInfo | null> => {
  if (!id){
    return null;
  }
  return fetch(`https://api.tvmaze.com/shows/${id}?embed=cast`).then(async res => {
    //In a real project I'd format the response from TvMaze to the structure used by us internally, but I'd use the same here so that I don't spend time on this
    const data: TvMazeShowInfo = await res.json();

    return {
      id: data.id,
      name: data.name,
      rating: data.rating?.average,
      genres: data.genres,
      status: data.status,
      schedule: data.schedule?.days,
      streamedOn: data.network?.name,
      coverUri: data.image?.medium,
      summary: data.summary,
      cast: data._embedded?.cast?.map(({person, character}) => ({name: person.name, character: character.name}))
    };
  })
}

export type TvMazeShowInfo = {
  id: number,
  name: string,
  rating: {
    average?: number
  },
  genres: string[],
  status: string,
  schedule: {
    days: string[]
  },
  network: {
    name: string
  },
  image: {
    medium: string
  },
  summary?: string,
  _embedded: {
    cast: {
      person: {
        name: string
      },
      character: {
        name: string
      }
    }[]
  }
}

export default showInfo;