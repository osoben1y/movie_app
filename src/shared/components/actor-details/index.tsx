import { usePerson } from "../../hooks/usePerson";
import MovieView from "../movie-view/MovieView";
import { useParams } from "react-router-dom";

const ActiorDetail = () => {
  const { id } = useParams();
  const { getPersonSingle, getMovieSingle } = usePerson();

  const { data: personData, isLoading, error } = getPersonSingle(id || "");
  const { data: personMoviesData } = getMovieSingle(id || "");

  if (isLoading) return <div className="text-center py-20 text-lg text-gray-700 dark:text-gray-200">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-20">Error: {error.message}</div>;
  if (!personData) return <div className="text-center text-gray-500">Actor not found</div>;

  return (
    <div className="relative min-h-screen bg-white text-gray-900 dark:bg-gradient-to-br dark:from-[#0f172a] dark:to-[#1e293b] dark:text-white transition-colors duration-300">
      {personData.profile_path && (
        <div className="absolute inset-0 z-0">
          <img
            src={`https://image.tmdb.org/t/p/original${personData.profile_path}`}
            alt={personData.name}
            className="w-full h-full object-cover opacity-10 blur-sm dark:opacity-20"
          />
          <div className="absolute inset-0 bg-white/70 dark:bg-black/60 backdrop-blur-sm"></div>
        </div>
      )}
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
            <img
              src={`https://image.tmdb.org/t/p/w500${personData.profile_path}`}
              alt={personData.name}
              className="w-64 h-auto object-cover"
            />
          </div>
          <div className="flex-1 bg-white/70 dark:bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-4 transition-colors duration-300">
            <h1 className="text-3xl font-bold">{personData.name}</h1>
            <p>
              <span className="font-semibold">Birthday:</span>{" "}
              {personData.birthday || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Born in:</span>{" "}
              {personData.place_of_birth || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Known For:</span>{" "}
              {personData.known_for_department}
            </p>
            <div className="pt-4 max-h-64 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-1">Biography</h2>
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                {personData.biography || "No biography available."}
              </p>
            </div>
          </div>
        </div>

        {personMoviesData?.cast?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-300 dark:border-white/30 pb-2">
              Top Movies
            </h2>
            <MovieView data={personMoviesData.cast.slice(0, 4)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiorDetail;
