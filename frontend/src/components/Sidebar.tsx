import { SideBarTypes } from "@/types/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectDiv, setSelectDiv] = useState(0);

  return (
    <div className="xl:w-72 p-5 flex flex-col gap-2 border-r-2 bg-primary-foreground/30 font-semibold text-lg">
      {SideBarTypes.map((items, index) => (
        <div
          className={`p-3 flex gap-3 items-center hover:translate-x-2 hover:underline hover:bg-primary/10 rounded-lg cursor-pointer ${
            index === selectDiv ? " bg-primary/10" : ""
          }`}
          key={index}
          onClick={() => {
            navigate(`${items.path}`);
            setSelectDiv(index);
          }}
        >
          <items.icon />
          <button className="hidden xl:block">{items.name}</button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
