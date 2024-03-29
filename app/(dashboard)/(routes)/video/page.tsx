"use client"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormMessage,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Heading from "@/components/heading";
import { Video, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoaderPage from "@/components/loader";

const formSchema = z.object({
    prompt: z.string().min(2, {
        message: "Input must be more than 5 characters.",
    }),
})
const VideoPage = () => {
    const router = useRouter()
    const [video, setVideo] = useState<string>()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    })
    const loading = form.formState.isSubmitting;
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setVideo(undefined)
            const response = await axios.post("/api/video", values)
            setVideo(response.data[0])
            form.reset()
            // console.log(response)
        } catch (error) {
            console.log("video page onsubmit error", error);

        } finally {
            router.refresh()
        }
    }
    return (
        <div>
            <Heading
                title="Vedio"
                description="Our most advanced Vedio model"
                icon={VideoIcon}
                iconColor="text-orange-700"
                bgColor="text-orange-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                        rounded-lg
                        border
                        w-full
                        p-4
                        px-3
                        md:px-6
                        fouce-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-2
                        "
                        >
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="p-0 m-0">
                                        <Input className="border-0 outline-none
                                  focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={loading}
                                            placeholder="a panda with a dog,shareing food"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={loading} variant="default">Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {!video && !loading && (
                        <div className="flex justify-center items-center text-muted-foreground">
                            <Video className="h-12 w-12 text-muted-foreground/50 mr-4"/>
                            there is no video</div>
                    )}
                    {loading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <LoaderPage></LoaderPage>
                        </div>

                    )}
                    {video && (<video controls className="w-full mt-8 rounded-lg border bg-black" >
                        <source src={video} />
                    </video>)}
                </div>
            </div>
        </div>
    );
}

export default VideoPage;