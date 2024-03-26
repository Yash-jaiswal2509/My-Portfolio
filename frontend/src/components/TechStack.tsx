import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { TechStackTypes } from "../types/TechStackTypes";

const TechStack = () => {
  return (
    <div className=" flex rounded-lg flex-col items-center justify-center">
      <InfiniteMovingCards
        items={TechStackTypes}
        direction="right"
        speed="normal"
      />
    </div>
  );
};

export default TechStack;
