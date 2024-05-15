import { TechStackTypes } from "../types/TechStackTypes";

const TechStack = () => {
  return (
    <div className="p-3 flex flex-nowrap gap-5 justify-center items-center animate-scroll hover:paused">
      {TechStackTypes.map((item, index) => {
        return (
          <div
            key={index}
            className="flex whitespace-nowrap items-center gap-2 justify-center p-4 bg-gray-400/10 dark:bg-gray-900/40 rounded-xl shadow-md dark:shadow-white/20"
          >
            {item.icon}
            <span className="text-base font-semibold">{item.skill}</span>
          </div>
        );
      })}
      {TechStackTypes.map((item, index) => {
        return (
          <div
            key={index}
            className="flex whitespace-nowrap items-center gap-2 justify-center p-4 bg-gray-400/10 dark:bg-gray-900/40 rounded-xl shadow-md dark:shadow-white/20"
          >
            {item.icon}
            <span className="text-lg font-semibold">{item.skill}</span>
          </div>
        );
      })}
      {TechStackTypes.map((item, index) => {
        return (
          <div
            key={index}
            className="flex whitespace-nowrap items-center gap-2 justify-center p-4 bg-gray-400/10 dark:bg-gray-900/40 rounded-xl shadow-md dark:shadow-white/20"
          >
            {item.icon}
            <span className="text-lg font-semibold">{item.skill}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TechStack;
