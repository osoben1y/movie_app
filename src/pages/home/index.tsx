import { memo } from 'react';
import Hero from './components/Hero';
import TopWeeks from "../../shared/components/top-weeks/TopWeeks";
import MovieView from "../../shared/components/movie-view/MovieView";
import { useFullMovieData } from "../../shared/hooks";

const Home = () => {

  const { data } = useFullMovieData();

  return (
    <div>
      <Hero />
      <div className="container-hero mb-[80px]">
        <TopWeeks />
        <MovieView data={data} />
      </div>
    </div>
  );
};

export default memo(Home);
