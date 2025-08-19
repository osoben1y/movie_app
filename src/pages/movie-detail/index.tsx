import { memo } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetail } from "./services/useMovieDetail";
import { IMAGE_URL } from "../../shared/const";
import MovieView from "../../shared/components/movie-view/MovieView";

const MovieDetail = () => {
  const { id } = useParams();
  const { getMovieById, getMovieItems } = useMovieDetail();
  const { data, isLoading } = getMovieById(id || "");
  const { data: imagesData } = getMovieItems(id || "", "images");
  const { data: similarData } = getMovieItems(id || "", "similar");
  const { data: creditsData } = getMovieItems(id || "", "credits");

  if (isLoading) {
    return (
      <div className="continer mx-auto">
        <div className="w-full h-[500px] bg-gray-300 animate-pulse rounded-xl"></div>
        <div className="my-3 w-[60%] h-8 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="my-3 w-[30%] h-8 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-[500px] rounded-b-xl overflow-hidden">
        <img
          src={`${IMAGE_URL}${data?.backdrop_path}`}
          alt={data?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-10 left-10 text-white max-w-2xl">
          <h1 className="text-4xl font-bold drop-shadow-lg">{data?.title}</h1>
          <p className="mt-3 text-lg text-gray-200">{data?.overview}</p>
          <div className="mt-4 flex items-center gap-6 text-gray-300">
            <span>🎬 {data?.release_date?.split("-")[0]}</span>
            <span>💰 {data?.budget?.toLocaleString()} USD</span>
            <span>⭐ {data?.vote_average?.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="continer mx-auto mt-12 space-y-16">      
        <section>
          <h2 className="text-2xl font-semibold mb-4">Кадры из фильма</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {imagesData?.backdrops?.slice(0, 12)?.map((item: any, inx: number) => (
              <img
                loading="lazy"
                key={inx}
                src={IMAGE_URL + item.file_path}
                alt=""
                className="rounded-lg w-full h-[180px] object-cover hover:scale-[1.02] transition-transform"
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Актерский состав</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {creditsData?.cast?.slice(0, 10).map((user: any) => {
              const image = user.profile_path
                ? IMAGE_URL + user.profile_path
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";
              return (
                <div
                  key={user.id}
                  className="text-center bg-[#1c1c1c] rounded-xl p-4 hover:bg-[#2a2a2a] transition"
                >
                  <img
                    loading="lazy"
                    src={image}
                    alt={user.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
                  />
                  <h3 className="text-white font-medium line-clamp-1">{user.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-1">{user.character}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Похожие фильмы</h2>
          <MovieView data={similarData?.results} />
        </section>
      </div>
    </div>
  );
};

export default memo(MovieDetail);
