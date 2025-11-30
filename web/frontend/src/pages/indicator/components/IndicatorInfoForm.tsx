import {Separator} from "@/components/ui/separator.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {Input, InputWithIcon} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import CategorySelect from "./CategorySelect";
import {useCategory} from "@/pages/indicator/hooks/useCategory.ts";
import { LuPercent } from "react-icons/lu";

const IndicatorInfoForm: React.FC = () => {

    const form = useForm()
    const {categoryData} = useCategory();

    return (
        <div className="bg-white rounded-[8px] shadow min-w-[571px] p-6 flex flex-col gap-5">
            <p className="text-xl font-bold text-gray-900">Indicator Information</p>
            <Separator/>
            <Form {...form}>
                <form
                    // onSubmit={form.handleSubmit(handleFormSubmit)}
                >
                    <div className="flex flex-col gap-3.5 w-full">
                        <FormField
                            control={form.control}
                            render={()=>(
                                <FormItem>
                                    <FormLabel>
                                        {"Title"}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="insert title of indicator"
                                            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 selection:bg-blue-200 selection:text-foreground"
                                        >

                                        </Input>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name="title">
                        </FormField>
                        <FormField
                            control={form.control}
                            render={()=>(
                                <FormItem>
                                    <FormLabel>
                                        {"Description"}
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="insert description of indicator"
                                            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 selection:bg-blue-200 selection:text-foreground"
                                        >

                                        </Textarea>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )} name="description">
                        </FormField>
                        <div className="flex flex-row gap-3.5 w-full">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {"Category"}
                                        </FormLabel>
                                        <CategorySelect
                                            datas={categoryData}
                                            onChange={field.onChange}
                                            value={
                                                categoryData.find((option) => option.value === field.value) ?? {
                                                    label: "",
                                                    value: ""
                                                }}
                                            placeholder="Select Category"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                render={()=>(
                                    <FormItem>
                                        <FormLabel>
                                            {"Weight"}
                                        </FormLabel>
                                        <FormControl>
                                            <InputWithIcon
                                                icon={<LuPercent/>}
                                                placeholder="0.0"
                                            >
                                            </InputWithIcon>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )} name="weight">
                            </FormField>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default IndicatorInfoForm