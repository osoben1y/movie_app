import { memo, useState, useEffect, useRef, useCallback } from "react";
import { useSearch } from "./services/useSearch";
import MovieView from "../../shared/components/movie-view/MovieView";
import { Input, Pagination, type PaginationProps } from "antd";
import { useParamsHooks } from "../../shared/hooks/useParams";
import { Search as SearchIcon } from "lucide-react";
import ErrorBoundary from "../../shared/components/error/ErrorBoundary";
import MovieCardSkeleton from "../../shared/components/loading/MovieCardSkeleton";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const { getParam, setParam, removeParam } = useParamsHooks();
  const query = getParam("query") || "";
  const pageParam = getParam("page") || "1";

  const { searchMovies } = useSearch();
  const { data, isLoading, isFetching } = searchMovies(
    query,
    currentPage.toString()
  );

  useEffect(() => {
    if (query) {
      setSearchValue(query);
    } else {
      setSearchValue("");
    }
    setCurrentPage(Number(pageParam) || 1);
  }, [query, pageParam]);

  useEffect(() => {
    setSearchResults([]);
    setCurrentPage(Number(pageParam) || 1);
    setHasMore(true);
    setIsInitialLoad(true);
  }, [query, pageParam]);

  useEffect(() => {
    if (data?.results) {
      if (currentPage === 1) {
        setSearchResults(data.results);
      } else {
        setSearchResults((prev) => [...prev, ...data.results]);
      }

      if (
        data.results.length === 0 ||
        (data.total_pages && currentPage >= Math.min(data.total_pages, 500))
      ) {
        setHasMore(false);
      }

      setIsInitialLoad(false);
    }
  }, [data, currentPage]);

  const handleSearch = (value: string) => {
    if (!value.trim()) {
      setParam("query", "");
      removeParam("page");
      setSearchResults([]);
      setCurrentPage(1);
      setHasMore(false);
      setIsInitialLoad(false);
      return;
    }

    setParam("query", value);
    removeParam("page");
    setSearchResults([]);
    setCurrentPage(1);
    setHasMore(true);
    setIsInitialLoad(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      handleSearch(value);
    }, 400);
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
    if (page === 1) {
      removeParam("page");
    } else {
      setParam("page", page.toString());
    }
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (
        entry.isIntersecting &&
        !isLoading &&
        !isFetching &&
        hasMore &&
        query
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    },
    [isLoading, isFetching, hasMore, query]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return (
    <section className="container mx-auto px-4 py-4 sm:py-8 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">
        Поиск фильмов
      </h1>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="relative flex-1">
          <Input
            placeholder="Введите название фильма..."
            value={searchValue}
            onChange={handleChange}
            className="w-full py-3 px-4 bg-[#1c1c1c] text-white border-gray-700 rounded-xl"
            style={{ height: "50px" }}
          />
          <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {query ? (
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-300 text-sm sm:text-base">
            {data?.total_results
              ? `Найдено ${data.total_results} результатов по запросу "${query}"`
              : `По запросу "${query}" ничего не найдено`}
          </p>
        </div>
      ) : (
        <div className="mb-4 sm:mb-6">
          <p className="text-center text-gray-300 text-sm sm:text-base italic">
            Kino dlya dushi...
          </p>
        </div>
      )}

      <ErrorBoundary>
        {isInitialLoad && isLoading ? (
          <div className="container mx-auto py-4">
            <MovieCardSkeleton count={20} />
          </div>
        ) : searchResults && searchResults.length > 0 ? (
          <>
            <MovieView data={searchResults} />
            <div className="flex justify-center mt-6">
              <Pagination
                current={currentPage}
                total={
                  data?.total_results > 10000 ? 10000 : data?.total_results || 0
                }
                showSizeChanger={false}
                defaultPageSize={20}
                onChange={onChange}
              />
            </div>

            {hasMore && (
              <div ref={loaderRef} className="flex justify-center py-8">
                <MovieCardSkeleton count={5} />
              </div>
            )}

            {!hasMore && (
              <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                Вы достигли конца результатов поиска
              </div>
            )}
          </>
        ) : query && !isLoading ? (
          <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            По запросу "{query}" ничего не найдено
          </div>
        ) : (
          <div className="mb-4 sm:mb-6">
            <p className="text-center text-gray-300 text-sm sm:text-base italic">
                Kino dlya dushi...
            </p>
          </div>
        )}
      </ErrorBoundary>
    </section>
  );
};

export default memo(Search);
