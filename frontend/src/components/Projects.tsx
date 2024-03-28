// import { useAuth } from "@/AuthProvider";
import TechStack from "./TechStack";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

const Projects = () => {
  // const { isLoggedIn } = useAuth();
  // const navigate = useNavigate();



  return (
    <div className="overflow-hidden flex flex-col">
      <TechStack />
      <div className="p-5 w-full grid grid-cols-3">
        <div></div>
      </div>
    </div>
  );
};

export default Projects;
