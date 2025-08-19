import { memo } from 'react';
import { useMovie } from '../../movie/services/useMovie';
import { IMAGE_URL } from '../../../shared/const';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { getMovies } = useMovie();
  const data = getMovies().data;
  const navigate = useNavigate();

  return (
    <div className="scroll-bar container_lg flex overflow-x-auto space-x-4 pb-4">
      {data?.results?.slice(0, 5).map((item: any, index: number) => (
        <div
          key={index}
          className="
            flex-shrink-0 relative 
            w-[1200px] h-[550px] 
            xl:w-[1000px] xl:h-[480px] 
            lg:w-[800px] lg:h-[420px] 
            md:w-[600px] md:h-[350px] 
            sm:w-[400px] sm:h-[250px] 
          "
        >
          <img
            onClick={() => navigate(`/movie/${item.id}`)}
            src={`${IMAGE_URL}${item.backdrop_path}`}
            alt={item.title}
            className="w-full h-full object-cover rounded-xl cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default memo(Hero);
