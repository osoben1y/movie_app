import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export const usePerson = () => {
  const getPersonSingle = (id: string) =>
    useQuery({
      queryKey: ["person", id],
      queryFn: () => api.get(`person/${id}`).then((res) => res.data),
    });
      const getMovieSingle = (id: string) =>
    useQuery({
      queryKey: ["movie", id],
      queryFn: () => api.get(`person/${id}/movie_credits`).then((res) => res.data),
    });


    

  return {getPersonSingle , getMovieSingle};
};

