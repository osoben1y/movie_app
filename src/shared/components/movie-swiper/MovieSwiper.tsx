import { memo, type FC, useState } from "react";
import { IMAGE_URL } from "../../const";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../slices/favoritesSlice";
import type { AppDispatch, RootState } from "../../../app/store";

interface Props {
  data: any[];
  className?: string;
  isLoading?: boolean;
}

const MovieSwiper: FC<Props> = ({ data, className, isLoading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const itemsPerView = 4;
  const maxIndex = Math.max(0, data.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <div className={`relative container mx-auto px-4 ${className || ""}`}>
      <div className="overflow-hidden pt-[20px] pb-[80px]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${(100 / itemsPerView) * currentIndex}%)`,
          }}
        >
          {data.map((movie) => {
            const movieIsFavorite = isFavorite(movie.id);
            return (
              <div
                key={movie.id}
                className="w-1/2 sm:w-1/3 lg:w-1/4 flex-shrink-0 px-2 cursor-pointer group"
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

      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-10 bg-[#1D1D1D] hover:bg-[#1D1D1D] text-[#C61F1F] p-3 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {currentIndex < maxIndex && (
        <button
          onClick={handleNext}
          className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-10 bg-[#1D1D1D] hover:bg-[#1D1D1D] text-[#C61F1F] p-3 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default memo(MovieSwiper);
