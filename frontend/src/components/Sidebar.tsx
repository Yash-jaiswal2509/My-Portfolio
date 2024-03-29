import { SideBarTypes } from "@/types/Sidebar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectDiv, setSelectDiv] = useState(0);

  useEffect(() => {
    const storedIndex = localStorage.getItem("selectedSidebarIndex");
    if (storedIndex !== null) {
      setSelectDiv(parseInt(storedIndex));
    }
  }, []);

  //update local storage whenever selected sidebar item changes
  useEffect(() => {
    localStorage.setItem("selectedSidebarIndex", selectDiv.toString());
  }, [selectDiv]);

  useEffect(() => {
    // here it selects sidebar item index based on current location
    const selectedIndex = SideBarTypes.findIndex(
      (item) => item.path === location.pathname
    );
    if (selectedIndex !== -1) {
      setSelectDiv(selectedIndex);
    }
  }, [location.pathname]);

  return (
    <div className="lg:w-80 p-5 hidden sm:flex flex-col gap-2 border-r-2 bg-primary-foreground/30 font-semibold text-lg">
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
          <button className="hidden lg:block">{items.name}</button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
