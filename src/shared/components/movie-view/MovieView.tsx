import { memo, type FC } from "react";
import { IMAGE_URL } from "../../const";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../slices/favoritesSlice";
import type { AppDispatch, RootState } from "../../../app/store";
import { Heart } from "lucide-react";

interface Props {
  data: any[];
  className?: string;
  isLoading?: boolean;
}

const MovieView: FC<Props> = ({ data, className, isLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.movies);

  const handleLikeClick = (e: React.MouseEvent, movie: any) => {
    e.stopPropagation();
    dispatch(addToFavorites(movie));
  };

  const handleUnlikeClick = (e: React.MouseEvent, movieId: number) => {
    e.stopPropagation();
    dispatch(removeFromFavorites(movieId));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  };

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center py-20 ${className || ""}`}>
        Loading...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className={`container mx-auto pt-[20px] pb-[80px] ${className || ""}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
        {data.slice(0, 20).map((movie) => {
          const movieIsFavorite = isFavorite(movie.id);
          return (
            <div
              key={movie.id}
              className="cursor-pointer group"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <div className="relative bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-md transition-all duration-500 group-hover:shadow-red-500/30 group-hover:scale-[1.04]">
                <div className="relative">
                  <img
                    loading="lazy"
                    src={`${IMAGE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-[380px] object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-90"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-yellow-400 px-2 py-1 rounded-lg text-sm font-semibold">
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </div>

                  <button
                    onClick={movieIsFavorite ? (e) => handleUnlikeClick(e, movie.id) : (e) => handleLikeClick(e, movie)}
                    className={`absolute top-2 left-2 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                      movieIsFavorite
                        ? "bg-red-500/80 text-white"
                        : "bg-black/70 text-white hover:bg-red-500/80"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${movieIsFavorite ? "fill-current" : ""}`} />
                  </button>
                </div>

              <div className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <h3
                  className="font-bold text-lg line-clamp-1"
                  title={movie.title}
                >
                  {movie.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  Release: {movie.release_date?.split("-")[0] || "—"}
                </p>
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(MovieView);
