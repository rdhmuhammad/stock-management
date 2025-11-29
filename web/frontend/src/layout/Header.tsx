import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import { Images } from "@/config/constant/Images";

const HeaderLayout: React.FC = ()=>{

    return(
        <header className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
                <SidebarTrigger/>
                <img
                    src={Images.APP_LOGO}
                    alt='Stock management'
                    className='w-[30px] h-[37px] object-cover'
                />
                <h1 className="text-2xl font-semibold text-gray-800">
                    El Ridos Management
                </h1>
            </div>
        </header>
    )
}

export default HeaderLayout