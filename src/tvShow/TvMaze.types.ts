
//A deeper look at the TvMaze documentation could help me to be more specific about the types, i.e. status or genre could be a list of possible values instead of a string
export type ShowInfo = {
  id: number,
  name: string,
  rating?: number,
  genres?: string[],
  status?: string,
  schedule?: string[],
  streamedOn?: string,
  coverUri?: string,
  summary?: string,
  cast?: {name: string, character: string}[]
}
