import styled from "styled-components";
import { mobile } from "../Breakpoints";

export const Container = styled.section`
  text-align: left;
  min-height: 100vh;
  padding: 1em 2em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const Header = styled.section`
  display: flex;
  flex-direction: row;
  gap: 3em;
  @media (max-width: ${mobile}) {
    flex-direction: column;
    gap: 1em;
  }
`;

export const MainInfo = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
`

export const Title = styled.h1`
  font-size: 1.5rem;
  margin: .5rem 0;
`

export const Summary = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  overflow: hidden;
  margin: 0;
`;

export const Rating = styled.p`
  margin: 0;
`;

export const Body = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 3em;
  & > * {
    width: 50%;
  } 

  @media (max-width: ${mobile}) {
    flex-direction: column;
    gap: 1em;
  }
`

export const InfoTitle = styled.h3`
  
`;

export const InfoItem = styled.p`
  border-bottom: 1px solid;
  padding-bottom: 1rem;
`

