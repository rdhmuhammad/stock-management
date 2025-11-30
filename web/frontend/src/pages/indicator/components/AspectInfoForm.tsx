import {Separator} from "@/components/ui/separator.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {Check, XIcon} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";
import {LuEye, LuPencil, LuPlus, LuPower, LuTrash, LuX} from "react-icons/lu";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import SignalDetailDialog from "@/pages/indicator/components/SignalDetailDialog.tsx";
import {useState} from "react";

interface IOpenSignalDialog {
    status: boolean,
}

const AspectInfoForm: React.FC = () => {

    const form = useForm()

    const status = [
        {
            label: "Bad",
            value: "bad",
        },
        {
            label: "Good",
            value: "good",
        }
    ]

    const [openDialogSignal, setOpenDialogSignal] = useState<IOpenSignalDialog>({
        status: false
    })

    return (
        <div className="bg-white rounded-[8px] shadow min-w-[571px] p-6 flex flex-col gap-5">
            <p className="text-xl font-bold text-gray-900">Aspect Information</p>
            <Separator/>
            <Form {...form}>
                <form
                    className="flex gap-3 flex-col"
                    // onSubmit={form.handleSubmit(handleFormSubmit)}
                >
                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-[37px] cursor-pointer text-sm font-medium text-gray-800"
                        >
                            <XIcon size={20}/>
                            {"Discard All"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="h-[37px] cursor-pointer rounded-[8px] text-sm font-medium text-white bg-emerald-800 hover:bg-emerald-700"                            // onClick={() => setOpenDiscardDialog(true)}
                        >
                            <Check size={20}/>
                            {"Add New"}
                        </Button>
                    </div>
                    <div className="h-[400px] overflow-y-scroll">
                        <div className={cn(
                            "w-full h-fit border border-gray-200 rounded-[8px] p-4 shadow",
                            "gap-4 grid grid-col-2 grid-flow-col"
                        )}>
                            <div className="gap-4 grid grid-col-2 grid-flow-col">
                                <div className="col-start-1">
                                    <FormField
                                        control={form.control}
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>
                                                    {"Name"}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder=""
                                                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 selection:bg-blue-200 selection:text-foreground"
                                                    >

                                                    </Input>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name="title">
                                    </FormField>
                                </div>
                                <div className="col-start-2">
                                    <FormField
                                        control={form.control}
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>
                                                    {"Weight"}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0.0"
                                                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 selection:bg-blue-200 selection:text-foreground"
                                                    >

                                                    </Input>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name="weight">
                                    </FormField>
                                </div>
                                <div className="col-start-1 col-end-3 row-start-2 row-end-2">
                                    <FormField
                                        control={form.control}
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>
                                                    {"Description"}
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder=""
                                                        className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 selection:bg-blue-200 selection:text-foreground"
                                                    >

                                                    </Textarea>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )} name="weight">
                                    </FormField>
                                </div>
                                <div className="row-start-3 col-start-1 col-end-3">
                                    <p className="font-medium">{"Signals"}</p>
                                    <div className="py-3">
                                        <Separator/>
                                    </div>
                                    <div className="flex justify-end pb-3">
                                        <Button
                                            variant="outline"
                                            className="h-[37px] border-green-700 cursor-pointer text-sm font-medium text-green-700"
                                        >
                                            <LuPlus/>
                                            {"Add Signals"}
                                        </Button>
                                    </div>

                                    {/*card signals*/}
                                    <div className="flex flex-col gap-3 overflow-x-scroll pb-3">
                                        {
                                            openDialogSignal.status && (
                                                <SignalDetailDialog
                                                    open={openDialogSignal.status}
                                                    onClose={() => setOpenDialogSignal({
                                                        status: false
                                                    })}
                                                />
                                            )
                                        }
                                        <div className={cn(
                                            "max-w-[200px] h-fit border border-gray-200 rounded-[8px] p-4 shadow",
                                            "gap-4 grid grid-col-2 grid-flow-row"
                                        )}>
                                            <div className="flex flex-row gap-2 items-center">
                                                <Badge className="bg-red-300">
                                                    <p className="font-medium text-red-800">Bad</p>
                                                </Badge>
                                                <Badge className="bg-green-300">
                                                    <p className="font-medium text-green-800">Active</p>
                                                </Badge>
                                                <Button variant="ghost" size="icon" className="h-4 w-4 ml-auto">
                                                    <LuX/>
                                                </Button>
                                            </div>
                                            <div>
                                                <p className="font-medium">{"Bullish Divergence"}</p>
                                            </div>
                                            <div className="flex flex-row gap-3">
                                                <p className="font-medium">{"Confident:"}</p>
                                                <p className="font-semibold text-gray-600">{"60"}</p>
                                            </div>
                                            <Separator/>
                                            <div className="flex flex-row gap-2">
                                                <Button variant="outline" className="bg-red-600 hover:bg-red-400"
                                                        size="icon">
                                                    <LuTrash className="text-white"/>
                                                </Button>
                                                <Button variant="outline" className="border-green-400"
                                                        size="icon">
                                                    <LuPower className="text-green-600"/>
                                                </Button>
                                                <Button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setOpenDialogSignal({
                                                            status: true
                                                        })
                                                    }}
                                                    variant="outline"
                                                    size="icon">
                                                    <LuPencil/>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 items-end justify-start">
                                <Button variant="outline" className="bg-red-600 hover:bg-red-400" size="icon">
                                    <LuTrash className="text-white"/>
                                </Button>
                                <Button variant="outline" size="icon">
                                    <LuPencil/>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AspectInfoForm