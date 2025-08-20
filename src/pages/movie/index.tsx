import { memo, useEffect, useState } from "react";
import MovieView from "../../shared/components/movie-view/MovieView";
import { getGenres, useFullMovieData } from "../../shared/hooks/getGenres";
import { Pagination, type PaginationProps } from "antd";
import { useParamsHook } from "../../shared/hooks/useParamsHook";
import { useMovie } from "./services/useMovie";
import { Period } from "../../shared/static";
import { Film, Calendar, Loader2 } from "lucide-react";

const Movie = () => {
  const [movieGenres, setMovieGenres] = useState<any>([]);

  const { getParam, setParam, removeParam } = useParamsHook();
  const with_genres = getParam("genre") || "";
  const page = getParam("page") || "1";
  const period = getParam("period") || "";

  const item = Period.find((item) => item.value === Number(period));
  const { getMovies } = useMovie();
  const { data: totalMovies } = getMovies();
  const { data, isLoading } = useFullMovieData({
    page,
    with_genres,
    "release_date.gte": item?.gte,
    "release_date.lte": item?.lte,
  });

  useEffect(() => {
    getGenres().then((res) => setMovieGenres(res));
  }, []);

  const handleChangeGenre = (id: string) => {
    setParam("genre", id);
    removeParam("page");
  };

  const handleChangePeriod = (value: string) => {
    setParam("period", value);
    removeParam("page");
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    if (page === 1) {
      removeParam("page");
    } else {
      setParam("page", page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="dark:bg-[#000000] transition-all min-h-screen">
      <div className="container py-8">
        <div className="bg-[#111111] rounded-2xl shadow-lg p-6 mb-8 transition-colors duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Film className="w-5 h-5 mr-2 text-red-500" />
                Genres
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {movieGenres?.map((genre: any) => (
                  <button
                    key={genre.id}
                    onClick={() => handleChangeGenre(String(genre.id))}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      String(genre.id) === with_genres
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-red-500" />
                Period
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {Period.map((p) => (
                  <button
                    key={p.value}
                    onClick={() => handleChangePeriod(String(p.value))}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      String(p.value) === period
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
          </div>
        ) : (
          <MovieView data={data} className="pt-5" isLoading={isLoading} />
        )}

        <div className="flex justify-center mt-8">
          <Pagination
            current={Number(page)}
            total={
              totalMovies?.total_results > 10000
                ? 10000
                : totalMovies?.total_results
            }
            showSizeChanger={false}
            defaultPageSize={20}
            onChange={onChange}
          />
        </div>
      </div>
    </section>
  );
};

export default memo(Movie);
