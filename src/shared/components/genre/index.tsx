import { useParamsHook } from "../../hooks/useParamsHook";
import React, { type FC } from "react";

export interface IGenre {
    id: number;
    name: string;
  }

interface Props {
  data: undefined | IGenre[];
}

const Genre: FC<Props> = ({ data }) => {
  const { setParam, getParam, removeParam} = useParamsHook();
  const genre = getParam("genre");

  const handleGenre = (id:number)=>{
    if(genre === id.toString()){
      removeParam("genre")
    }else{
      setParam("genre", id.toString())
    }
  }

  return (
    <div className="flex overflow-auto gap-4">
      {data?.map((item: IGenre) => (
        <div
          onClick={() => handleGenre(item.id)}
          className={`text-nowrap cursor-pointer select-none  px-3 rounded ${
            item.id.toString() === genre ? "bg-black text-white" : ""
          }`}
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Genre);
