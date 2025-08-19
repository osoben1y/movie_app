import { memo } from 'react';
import Hero from './components/Hero';
import { useMovie } from '../movie/services/useMovie';
import { useNavigate } from 'react-router-dom';
import { IMAGE_URL } from '../../shared/const';

const Home = () => {
  const {getMovies} = useMovie()
 const data= getMovies().data

 const navigate = useNavigate()
  return (
    <div className="">
      <Hero/>
      <div className='continer grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 px-[16px] mt-[80px]'>
          {
            data?.results?.splice(0,8).map((movie: any, index: number)=>(
               <div key={index} className='rounded-2xl overflow-hidden'>
                        <div onClick={()=> navigate(`/movie/${movie.id}`)}>
                            <img loading='lazy' src={`${IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
                        </div>
                        <div className='p-2 text-white'>
                            <h3 className='font-bold text-xl line-clamp-1' title={movie.title}>{movie.title}</h3>
                            <p className='text-[20px]'> year: {movie.release_date}</p>
                            <p>⭐ {movie.vote_average}</p>
                        </div>
                    </div>
            ))
          }
      </div>
    </div>
  );
};

export default memo(Home);