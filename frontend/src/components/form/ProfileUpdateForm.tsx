import { profileUpdateSchema } from '@/Schema/profileUpdateSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'


export default function ProfileUpdateForm() {
    const form = useForm({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            name: '',
            email: '',
        }
    })


    const onSubmit = async (data: z.infer<typeof profileUpdateSchema>) => {
        (async () => {
            await axios.post(`/api/v1/users/profile-update`,{
                name : data.name,
                email : data.email
            } )
                .then((data) => {
                    console.log("data", data)
                })
        })()
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="new name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder=" new xyz@gmail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" >Update now</Button>
                </form>
            </Form>
        </div>
    )
}
