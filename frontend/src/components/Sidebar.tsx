import { SideBarTypes } from "@/types/Sidebar";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="xl:w-80 p-5 flex flex-col border-r-2 bg-primary-foreground/30 font-semibold text-lg">
      {SideBarTypes.map((items, index) => (
        <div
          className="p-3 flex gap-3 items-center hover:translate-x-2 hover:underline hover:bg-primary/10 rounded-lg cursor-pointer"
          key={index}
          id={`${index}`}
          onClick={()=>navigate(`${items.path}`)}
        >
          <items.icon />
          <button className="hidden xl:block">{items.name}</button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
