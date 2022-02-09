import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams, useParams } from "react-router-dom";
import { ShowInfo } from "./TvShow.types";
import requestTvShowById from './action/requestTvShowById'
import { Body, Container, Header, InfoItem, InfoTitle, MainInfo, Rating, Summary, Title } from "./TvShowInfo.styles";

function TvShowInfo() {
  const {id} = useParams();
  const [params] = useSearchParams();
  const [tvShow, setTvShow] = useState<Partial<ShowInfo>>({name: params.get("name") || '', coverUri: params.get("cover") || ""})
  const {data, error, isLoading} = useQuery<unknown, unknown, ShowInfo[]>(
    `show_${id}`, () => requestTvShowById(id), {}
  )
  useEffect(() => {
    if (data){
      setTvShow(oldInfo => ({...oldInfo, ...data}))
    }
  }, [data])

  return <Container>
    <Header>
      {
        tvShow.coverUri ? 
        <img src={tvShow.coverUri} alt={`${tvShow.name} movie cover`}></img>
        : <img src='' alt='Not available'></img>
      }
      <MainInfo>
        {tvShow.rating ? <Rating>{tvShow.rating} / 10</Rating> : null}
        <Title>{tvShow.name}</Title>
        <Summary>{tvShow.summary?.replace(/<\/?[^>]+>/gi, '')}</Summary>
      </MainInfo>
    </Header>
    {error ? 'There was an error looking at the tv show info. Please, try again later' : null}
    {isLoading ? '...Loading' : 
      <Body>
        <section>
          <InfoTitle>Show Info</InfoTitle>
          <InfoItem>Streamed on: {tvShow.streamedOn}</InfoItem>
          <InfoItem>Schedule: {tvShow.schedule?.map(day => `${day}s`)?.join(", ")}</InfoItem>
          <InfoItem>Status: {tvShow.status}</InfoItem>
          <InfoItem>Genres: {tvShow.genres?.join(", ")}</InfoItem>
        </section>
        <section>
          <InfoTitle>Starring</InfoTitle>
          {tvShow.cast?.map(({name, character}) => (
            <InfoItem key={`${name} - ${character}`}>{name} as {character}</InfoItem>
          ))}
        </section>
      </Body>
     }
  </Container>
}

export default TvShowInfo;