import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorites, loadFavorites } from '../../shared/slices/favoritesSlice';
import type { AppDispatch, RootState } from '../../app/store';
import MovieView from '../../shared/components/movie-view/MovieView';
import ErrorBoundary from '../../shared/components/error/ErrorBoundary';
import ErrorFallback from '../../shared/components/error/ErrorFallback';

const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => selectFavorites(state));

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);


  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Избранные фильмы</h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 sm:py-16 text-center">
          <div className="w-16 h-16 sm:w-24 sm:h-24 mb-4 sm:mb-6 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">У вас пока нет избранных фильмов</h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-md mb-4 sm:mb-6 px-4">
            Добавляйте фильмы в избранное, чтобы быстро находить их позже
          </p>
          <a
            href="/movie"
            className="px-5 py-2 sm:px-6 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm sm:text-base font-medium transition-colors"
          >
            Найти фильмы
          </a>
        </div>
      ) : (
        <ErrorBoundary fallback={<ErrorFallback error={new Error("An error occurred")} resetErrorBoundary={() => {}} />}>
          <MovieView data={favorites} />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default memo(Favorites);
