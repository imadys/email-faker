import './App.css'

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Label} from "@/components/ui/label";
import {useState} from "react";

export default function Home() {

    const [value, setValue] = useState("")

    const formSchema = z.object({
        username: z.string().min(1),
        provider: z.string().min(1),
    })

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            provider: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {

        const currentDate = new Date();

        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString().slice(2);
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();


        const final = `${values.username}+${day}${month}${year}${hours}${minutes}${seconds}${values.provider}`
        setValue(final)
    }

    return (
        <main className="flex flex-col items-center justify-between w-full p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm  space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="yaman3bd" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Your email username
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="provider"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Provider</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a mail provider"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="@msaaq.com">Msaaq</SelectItem>
                                        <SelectItem value="@gmail.com">Gmail</SelectItem>
                                        <SelectItem value="@hotmail.com">Hotmail</SelectItem>
                                        <SelectItem value="@icloud.com">Icloud</SelectItem>
                                        <SelectItem value="@yahoo.com">Yahoo</SelectItem>
                                        <SelectItem value="@outlook.com">Outlook</SelectItem>
                                        <SelectItem value="@yandex.com">Yandex</SelectItem>
                                        <SelectItem value="@zoho.com">Zoho</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Your email provider
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {value && <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="fakeemail">Your New Fake Email</Label>
                        <Input
                            value={value}
                            readOnly
                            type="text" id="fakeemail"/>
                    </div>}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>

        </main>
    );
}


