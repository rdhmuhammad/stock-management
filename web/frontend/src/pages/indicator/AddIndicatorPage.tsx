import {ROUTES} from "@/config/constant/ROUTES.ts";
import {ArrowLeft, Check, Home, XIcon} from "lucide-react";
import {CustomBreadcrumb} from "@/components/common/CustomBreadcrumb.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import WarningDialog from "@/components/common/WarningDialog";
import {IoIosInformationCircle} from "react-icons/io";
import DoneDialog from "@/components/common/DoneDialog";
import IndicatorInfoForm from "@/pages/indicator/components/IndicatorInfoForm.tsx";
import AspectInfoForm from "@/pages/indicator/components/AspectInfoForm.tsx";

const AddIndicatorPage: React.FC = () => {
    const navigate = useNavigate();
    const state = useLocation().state

    const [openDiscardDialog, setOpenDiscardDialog] = useState(false)
    const [openAllDoneDialog, setOpenAllDoneDialog] = useState(false)

    const BREADCRUMBITEM = [
        {label: "Home", href: ROUTES.DASHBOARD, icon: <Home size={20}/>},
        {label: "Indicator", href: ROUTES.INDICATOR.ROOT},
        {label: "Add New", href: ROUTES.INDICATOR.ADD_NEW}
    ]

    return (
        <div className="w-full h-full bg-gray-50">
            {/*Dialog Discard*/}
            {
                openDiscardDialog && (
                    <WarningDialog
                        open={openDiscardDialog}
                        onClose={() => setOpenDiscardDialog(false)}
                        icon={<IoIosInformationCircle className="w-[45px] h-[45px] text-gray-400"/>}
                        title={`Are you sure you want to discard this person access?\nYou will be unsave all this!`}
                        onSubmit={async () => {
                            setOpenDiscardDialog(false)
                            // navigate(-1)
                            navigate(ROUTES.INDICATOR.ROOT,
                                {
                                    replace: true,
                                    state: {
                                        categoryData: state?.categoryData
                                    }
                                }
                            )
                        }}
                        labelYes="Discard anyway"
                        labelNo="Cancel"
                    />
                )
            }
            {/*Dialog Save All*/}
            {
                openAllDoneDialog && (
                    <DoneDialog
                        open={openAllDoneDialog}
                        onClose={() => setOpenAllDoneDialog(false)}
                        onSubmit={() => {
                            setOpenAllDoneDialog(false)
                            console.log("state?.categoryData :: ", state?.categoryData)
                            navigate(ROUTES.INDICATOR.ROOT,
                                {
                                    replace: true,
                                    state: {
                                        categoryData: state?.categoryData
                                    }
                                }
                            )
                        }}
                    />
                )
            }
            <div className="h-full bg-gray-50 flex flex-col justify-start items-center gap-3">
                <div className="w-full grid grid-flow-col grid-cols-3 gap-4 px-3 bg-white border-b  ">
                    <div className="p-4">
                        <CustomBreadcrumb items={BREADCRUMBITEM}/>
                        <div className="flex flex-row gap-6 pt-3">
                            <button
                                onClick={() => {
                                    if (state?.categoryData) {
                                        navigate(ROUTES.INDICATOR.ROOT,
                                            {
                                                replace: true,
                                                state: {
                                                    categoryData: state?.categoryData
                                                }
                                            }
                                        )
                                    } else {
                                        navigate(-1)
                                    }
                                }}
                                className="flex flex-row items-center gap-2 text-sm text-gray-800 cursor-pointer hover:text-gray-500"
                            >
                                <ArrowLeft size={20}/>
                                {"Back"}
                            </button>
                        </div>
                    </div>
                    <div className="col-start-3 col-end-4 flex flex-row gap-4 justify-end pt-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-[37px] cursor-pointer text-sm font-medium text-gray-800"
                            onClick={() => setOpenDiscardDialog(true)}
                        >
                            <XIcon size={20}/>
                            {"Discard"}
                        </Button>
                        <Button
                            className="h-[37px] cursor-pointer rounded-[8px] text-sm font-medium text-white bg-emerald-800 hover:bg-emerald-700"
                            onClick={() => setOpenAllDoneDialog(true)}
                        >
                            <Check size={20}/>
                            {"Save"}
                        </Button>
                    </div>
                </div>
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        <IndicatorInfoForm/>
                        <AspectInfoForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddIndicatorPage