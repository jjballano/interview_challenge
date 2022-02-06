
export type ShowData = {
  id: number,
  url: string,
  name: string,
  imageUri: string
}

export type DataReceived = {
  id: number,
  show: {id: number, name: string, url: string, image: {medium: string}}
}

type ListResponse = {response: ShowData[]};

const list = async (): Promise<ListResponse> => {
  return fetch('https://api.tvmaze.com/schedule').then(async res => {
    return (await res.clone().json()).map((result: DataReceived) => {
      const tvShow = result.show;
      return {id: tvShow.id, name: tvShow.name, url: tvShow.url, imageUri: tvShow.image?.medium}
    })
  })
}

export default list;