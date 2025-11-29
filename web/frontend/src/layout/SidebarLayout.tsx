import {Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar.tsx";
import {useMemo} from "react";
import {NavLink} from "react-router-dom";
import {type MenuItem, SIDEBAR_ROUTES} from "@/config/constant/sidebarRoutes.ts";

interface LinkClassesProps {
    isActive: boolean;
}

const SidebarLayout: React.FC = ()=>{
    const routes = useMemo(() => SIDEBAR_ROUTES() as MenuItem[], []);

    // Original styling functions - unchanged
    const getLinkClasses = ({ isActive }: LinkClassesProps): string =>
        `flex items-center gap-3 p-2 text-base font-medium rounded-[8px] transition-colors ${isActive
            ? "bg-gray-100 text-gray-900"
            : "hover:bg-gray-100 text-gray-400"
        }`;

    // Render regular menu item - unchanged
    const renderRegularItem = (item: MenuItem) => (
        <SidebarMenuItem key={item.label}>
            <NavLink to={item.path} className={getLinkClasses}>
                <item.icon className="w-6 h-6" />
                <span className="text-gray-900">{item.label}</span>
            </NavLink>
        </SidebarMenuItem>
    );

    // Main render function for menu items - unchanged
    const renderMenuItem = (item: MenuItem) => {
        return renderRegularItem(item);
    };


    return(
        <Sidebar className="left-0 pt-18 z-40 flex flex-col border-r h-full border-gray-200">
            <SidebarContent className="flex flex-col justify-between px-3 py-1.5 bg-white">
                <div>
                    <SidebarMenu className="gap-1.5">
                        {routes.map(renderMenuItem)}
                    </SidebarMenu>
                </div>
            </SidebarContent>
        </Sidebar>
    )
}

export default SidebarLayout