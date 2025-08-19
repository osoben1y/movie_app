import { memo } from "react";
import hero from "../../../shared/assets/hero/hero.png";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";


const Home = () => {
  return (
    <section className="dark:bg-[#000000] dark:transition-all transition-all">
      <div className="container-hero relative">
        <div>
          <img src={hero} className="w-full object-cover" alt="" />
        </div>

        <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[8px] w-[380px]">
          <h1 className="font-medium text-[32px] text-[#FFFFFF] text-center">
            Kung Fu Panda 4
          </h1>

          <div className="flex items-center gap-2 text-[#ffffff]">
            <span>2024</span>
            <div className="h-[4px] w-[4px] bg-[white] rounded-[100px]"></div>
            <span>Комедия</span>
            <div className="h-[4px] w-[4px] bg-[white] rounded-[100px]"></div>
            <span>1ч 34м</span>
            <div className="h-[4px] w-[4px] bg-[white] rounded-[100px]"></div>
            <span>EN</span>
            <div className="h-[4px] w-[4px] bg-[white] rounded-[100px]"></div>
            <span>6+</span>
          </div>

          <button className="flex items-center justify-center gap-[7px] w-full h-[50px] bg-[#ffffff] rounded-[12px] text-[#C61F1F]">
            <Play />
            <span>Watch</span>
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-1">
        <button className="border p-[13px] rounded-[50%] bg-[#1D1D1D]">
          <ArrowLeft className="text-[red] w-5 h-5" />
        </button>
        <div className="px-2.5">
          <img src={hero} width={108} alt="" />
        </div>
        <button className="border p-[13px] rounded-[50%] bg-[#1D1D1D]">
          <ArrowRight className="text-[red] w-5 h-5" />
        </button>
      </div>

      
    </section>
  );
};

export default memo(Home);
