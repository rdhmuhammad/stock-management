import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Circle, Plus} from "lucide-react"
import {useForm} from "react-hook-form"
import {Input} from "@/components/ui/input.tsx";
import CategorySelect from "@/pages/indicator/components/CategorySelect.tsx";
import {Slider} from "@/components/ui/slider"
import {Badge} from "@/components/ui/badge.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

interface ISignalDetailDialog {
    open: boolean
    onClose: () => void
    // data?: AddLicensePlateNumberSchemaRequest
    // onSubmit: (payload: AddLicensePlateNumberSchemaRequest) => Promise<void>
}

const SignalDetailDialog: React.FC<ISignalDetailDialog> = ({
                                                               open,
                                                               onClose
                                                           }: ISignalDetailDialog) => {
    const form = useForm({
        // resolver: zodResolver(addLicensePlateNumberSchema),
        defaultValues: {
            category: "",
            vehicle_type: "",
            plate_number: "",
            rf_id: "",
        }
    })


    return (
        <Dialog
            open={open}

            onOpenChange={(open) => {
                if (open) return
                onClose()
            }}
        >
            <DialogContent
                className="w-[500px] p-0 gap-0"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="p-6">
                    <DialogTitle className="text-lg font-semibold text-gray-900">
                        {false ? "Edit Signal" : "Add New Signal"}
                    </DialogTitle>
                    <DialogDescription className="hidden"></DialogDescription>
                </DialogHeader>
                <div className="w-full p-0 m-0 border border-gray-200"/>
                <Form
                    {...form}
                >
                    <form
                        // onSubmit={form.handleSubmit(handleFormSubmit)}
                    >
                        <div className="grid grid-flow-col grid-cols-2 gap-3.5 p-6 w-full">
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
                                    )} name="name">
                                </FormField>
                            </div>
                            <div className="col-start-2 col-end-3">
                                <FormField
                                    control={form.control}
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>
                                                {"Signal"}
                                            </FormLabel>
                                            <div className="flex flex-row gap-2 items-center">
                                                <CategorySelect
                                                    classNameTrigger="w-full"
                                                    datas={[
                                                        {value: "bad", label: "Bad"}
                                                    ]}
                                                    onChange={(value) => console.log(value)}
                                                    // value={}
                                                    placeholder="Select Signal"
                                                    emptyMessage="No Signal"
                                                />
                                                <Badge
                                                    className="w-3 h-4 bg-green-400"
                                                />
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name="name">
                                </FormField>
                            </div>
                            <div className="row-start-2 col-start-1 col-end-3">
                                <FormField
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>
                                                {"Confident Level"}
                                            </FormLabel>
                                            <FormControl>
                                                <div className="flex flex-row gap-2 justify-center items-center">
                                                    <div className="flex-9">
                                                        <Slider
                                                            value={[field.value || 0]}
                                                            onValueChange={(val) => field.onChange(val[0])}
                                                            min={0}
                                                            max={100}
                                                            step={5}
                                                            className=""/>
                                                    </div>
                                                    <span
                                                        className="flex-1 text-sm text-gray-500">{field.value} %</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )} name="confident_level">
                                </FormField>
                            </div>
                            <div className="row-start-3 col-start-1 col-end-3">
                                <FormField
                                    control={form.control}
                                    render={({field}) => (
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
                                    )} name="confident_level">
                                </FormField>
                            </div>

                        </div>
                        <div className="w-full p-0 m-0 border border-gray-200"/>
                        <div className="flex flex-row gap-4 w-full p-6">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1 h-[41px] cursor-pointer text-sm font-medium text-gray-800"
                                onClick={onClose}
                            >
                                {"Discard"}
                            </Button>
                            <Button
                                className="flex-1 h-[41px] cursor-pointer rounded-[8px] text-sm font-medium text-white bg-emerald-800 hover:bg-emerald-700"
                                type="submit"
                                // disabled={form.formState.isSubmitting}
                            >
                                {
                                    <Plus size={20}/>
                                }
                                {
                                    "Save Changes"
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default SignalDetailDialog