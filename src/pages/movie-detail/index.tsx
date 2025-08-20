import { memo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetail } from "./services/useMovieDetail";
import { IMAGE_URL } from "../../shared/const";
import MovieView from "../../shared/components/movie-view/MovieView";
import { CalendarDays, ChartNoAxesCombined, Clock, CircleDollarSign, PlayCircle } from "lucide-react";
import MovieTrailer from "../../shared/components/trailer/MovieTrailer";
import { useVideos } from "../../shared/hooks/useVideos";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMovieById, getMovieItems } = useMovieDetail();
  const { data, isLoading } = getMovieById(id || "");
  const { data: imagesData } = getMovieItems(id || "", "images");
  const { data: similarData } = getMovieItems(id || "", "similar");
  const { data: creditsData } = getMovieItems(id || "", "credits");
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");
  const { getMovieVideos } = useVideos();
  const { data: videosData } = getMovieVideos(id || "");

  const handleOpenTrailer = () => {
    const trailer = videosData?.results?.find(
      (video: any) => video.type === "Trailer" && video.site === "YouTube"
    );
    if (trailer) {
      setTrailerKey(trailer.key);
      setTrailerOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="w-full h-[500px] bg-gray-300 animate-pulse rounded-xl"></div>
        <div className="my-3 w-[60%] h-8 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="my-3 w-[30%] h-8 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="w-full text-white">
      <div className="relative w-full h-[500px] rounded-b-3xl overflow-hidden">
        <img
          src={`${IMAGE_URL}${data?.backdrop_path}`}
          alt={data?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        <div className="absolute bottom-10 left-10 max-w-3xl">
          <h1 className="text-4xl font-bold drop-shadow-lg">{data?.title}</h1>
          <p className="mt-3 text-lg text-gray-200 line-clamp-3">{data?.overview}</p>
          <div className="mt-4 flex flex-col gap-4 text-gray-300 text-sm">
            <div className="flex flex-wrap items-center gap-6">
              <span className="flex items-center gap-1">
                <CalendarDays /> {data?.release_date?.split("-")[0]}
              </span>
              <span className="flex items-center gap-1">
                <ChartNoAxesCombined /> {data?.vote_average?.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Clock /> {data?.runtime} min
              </span>
              <span className="flex items-center gap-1">
                <CircleDollarSign /> {data?.budget?.toLocaleString()} USD
              </span>
            </div>

            {videosData?.results?.some(
              (video: any) => video.type === "Trailer" && video.site === "YouTube"
            ) && (
                <>
                  <button
                    onClick={handleOpenTrailer}
                    className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg py-3 px-6 rounded-xl transition transform hover:scale-105 shadow-lg hover:shadow-red-500/40 w-fit animate-pulse"
                  >
                    <PlayCircle className="w-6 h-6" />
                    <span className="font-semibold">Посмотреть трейлер</span>
                  </button>

                  <MovieTrailer
                    videoKey={trailerKey}
                    isOpen={trailerOpen}
                    onClose={() => setTrailerOpen(false)}
                  />
                </>
              )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 space-y-16">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Актерский состав</h2>
          <div className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 pb-4">
            {creditsData?.cast?.slice(0, 12).map((user: any) => {
              const image = user.profile_path
                ? IMAGE_URL + user.profile_path
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";
              return (
                <div
                  key={user.id}
                  onClick={() => navigate(`/actor/${user.id}`)}
                  className="min-w-[140px] bg-[#1c1c1c] rounded-xl p-4 hover:bg-[#2a2a2a] transition cursor-pointer"
                >
                  <img
                    loading="lazy"
                    src={image}
                    alt={user.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
                  />
                  <h3 className="text-center font-medium line-clamp-1">{user.name}</h3>
                  <p className="text-center text-sm text-gray-400 line-clamp-1">{user.character}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Кадры из фильма</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {imagesData?.backdrops?.slice(0, 12)?.map((item: any, inx: number) => (
              <img
                key={inx}
                loading="lazy"
                src={IMAGE_URL + item.file_path}
                alt=""
                className="rounded-xl w-full h-[180px] object-cover hover:scale-[1.02] transition-transform"
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Похожие фильмы</h2>
          <MovieView data={similarData?.results} />
        </section>
      </div>
    </div>
  );
};

export default memo(MovieDetail);
