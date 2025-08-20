import { lazy, memo } from 'react';
import { useRoutes } from 'react-router-dom';
const MainLayout = lazy(()=> import("../layout/MainLayout"))
const Home = lazy(()=> import("../pages/home"))
const Movie = lazy(()=> import("../pages/movie"))
const MovieDetail = lazy(()=> import("../pages/movie-detail"))
const Search = lazy(()=> import("../pages/search"))
const Favourites = lazy(()=> import("../pages/favourites"))
const ActorDetail = lazy(()=> import("../shared/components/actor-details"))
const Auth = lazy(()=> import("../pages/auth"))

const AppRouters = () => {
  return useRoutes([
    {path: "/", element: <MainLayout/>, children: [
      {index: true, element:<Home/>},
      {path:"movie", element:<Movie/>},
      {path:"movie/:id", element:<MovieDetail/>},
      {path:"search", element:<Search/>},
      {path:"favourites", element:<Favourites/>},
      {path:"actor/:id", element:<ActorDetail/>},
    ]},
    {path: "/auth", element: <Auth/>}
  ])
};

export default memo(AppRouters);