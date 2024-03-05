import { SideBarTypes } from "@/types/Sidebar";


const Sidebar = () => {
    return (
        <div className="w-80 p-5 h-full flex flex-col border-r-2 bg-primary-foreground/30 font-semibold text-lg">
            {SideBarTypes.map((items, index) => (
                <button className="p-3 flex gap-3 items-center hover:translate-x-2 hover:underline hover:bg-primary/10 rounded-lg cursor-pointer" key={index} id={`${index}`}>
                    <items.icon /> {items.name}</button>
            ))}
        </div>
    )
}

export default Sidebar;