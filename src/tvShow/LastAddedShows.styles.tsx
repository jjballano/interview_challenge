import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const TvShowList = styled.section`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2em;
`

export const TvShow = styled(NavLink)`
  width: 7em;
  display: flex;
  flex-direction: column;
  & > p {
    margin-top: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    overflow: hidden;
  }
  text-decoration: none;
  color: white;
`

