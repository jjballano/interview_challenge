import { useSearchParams } from "react-router-dom";

function TvShowInfo() {
  const [params] = useSearchParams();
  return <>{params.get('name')}</>
}

export default TvShowInfo;